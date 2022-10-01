import { Card, Popconfirm } from "antd";
import { CloseOutlined } from "@ant-design/icons";
function AnimeCard({
  data = {},
  onCloseClick = () => {},
  showClose,
  ...props
}) {
  return (
    <Card
      hoverable
      style={{
        width: 240,
        height: 350,
        margin: 10,
      }}
      cover={
        <img
          alt="example"
          src={data.images.jpg.image_url}
          style={{ height: 260 }}
        />
      }
      {...props}
    >
      {showClose ? (
        <Popconfirm
          title="Are you sure to remove this from your wishlist?"
          onConfirm={onCloseClick}
          okText="Yes"
          cancelText="No"
          placement="topRight"
        >
          <div
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              padding: "2px 5px",
              backgroundColor: "#00000080",
            }}
          >
            <CloseOutlined style={{ color: "#fff", fontSize: 20 }} />
          </div>
        </Popconfirm>
      ) : null}
      <Card.Meta title={data.title} description={data.rating} />
    </Card>
  );
}

export default AnimeCard;
