import { Input, Select, Space, Spin } from "antd";
import { useEffect, useRef, useState } from "react";
import AnimeCard from "../components/AnimeCard";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist, setAnimes } from "../actions/anime";

function Home() {
  const [loading, setLoading] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
  const [genresTypes, setGenresTypes] = useState([]);
  const draggedCard = useRef();
  const dispatch = useDispatch();
  const animes = useSelector((state) => state.anime.animes);
  const wishlist = useSelector((state) => state.anime.wishlist);

  useEffect(() => {
    setLoading(true);
    fetch("https://api.jikan.moe/v4/anime")
      .then((res) => {
        return res.json();
      })
      .then((responseData) => {
        let data = responseData.data;
        dispatch(setAnimes(data));
        let genresObj = data.reduce((obj, item) => {
          item.genres.map((gen) => {
            obj[gen.name] = 1;
          });
          return obj;
        }, {});
        setGenresTypes(Object.keys(genresObj));
        setFilteredItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onSearch = (value) => {
    value = value.trim();
    let filteredItems = animes.filter((item) => {
      return item.title.toLowerCase().includes(value.toLowerCase());
    });
    setFilteredItems(filteredItems);
  };

  const handleChange = (selectedValues) => {
    if (selectedValues.length == 0) {
      setFilteredItems(animes);
      return;
    }
    let filteredItems = animes.filter((item) => {
      let includeThisItem = false;
      item.genres.map((gen) => {
        if (selectedValues.includes(gen.name)) {
          includeThisItem = true;
        }
      });
      return includeThisItem;
    });
    setFilteredItems(filteredItems);
  };

  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = () => {
    let isExist = wishlist.find(
      (item) => item.mal_id === draggedCard.current.mal_id
    );
    if (!isExist) {
      dispatch(addToWishlist(draggedCard.current));
    }
  };

  return (
    <div style={{ backgroundColor: "lightgreen", minHeight: "100vh" }}>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 30,
        }}
      >
        <Input.Search
          allowClear={true}
          placeholder="search title"
          onSearch={onSearch}
          style={{
            width: 300,
          }}
        />
        <div style={{ width: "100%", marginTop: 15 }}>
          <Space>
            <div>Filter by Genres:</div>
            <Select
              mode="multiple"
              allowClear
              style={{
                width: 200,
              }}
              placeholder="select genres"
              onChange={handleChange}
            >
              {genresTypes.map((item, index) => {
                return (
                  <Select.Option key={index} value={item}>
                    {item}
                  </Select.Option>
                );
              })}
            </Select>
          </Space>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            flex: 1,
            justifyContent: "space-around",
          }}
        >
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => {
              return (
                <AnimeCard
                  data={item}
                  key={index}
                  draggable
                  onDragStart={() => {
                    draggedCard.current = item;
                  }}
                />
              );
            })
          ) : loading ? (
            <Spin />
          ) : (
            <div>No matched items to display</div>
          )}
        </div>
        <div
          style={{
            backgroundColor: "#fff",
            padding: 10,
            width: 280,
            margin: "0px 15px",
          }}
          onDragOver={handleOnDragOver}
          onDrop={(e) => handleDrop(e)}
        >
          <h2 style={{ textAlign: "center" }}>Your Wishlist</h2>
          <div style={{ textAlign: "center", color: "grey" }}>
            drag and drop here
          </div>
          {wishlist.map((item, index) => {
            return (
              <AnimeCard
                onCloseClick={() => {
                  dispatch(removeFromWishlist(item));
                }}
                showClose={true}
                key={index}
                data={item}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
