import { Button, Card } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";

type StoreItemProps = {
  id: number
  name: string
  price: number
//   imgUrl: string
}
export default function StoreItemNew (item : StoreItemProps) {
  const {getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart} = useShoppingCart();
  const quantity = getItemQuantity(item.id);   

  return (
    <Card className="h-100">
      <Card.Img
        variant="top" // src="" 
        height="200px" style={{ objectFit: "cover" }} />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{item.name}</span>
          <span className="ms-2 text-muted">{item.price}</span>
        </Card.Title>
        <div className="mt-auto">


          {quantity === 0 ? (

            <Button className="w-100" onClick={() => increaseCartQuantity(item.id, item.name, item.price)}>
              + Add To Cart
            </Button>

          ) : (

            <div className="d-flex align-items-center flex-column" style={{ gap: ".5rem" }}>
              <div className="d-flex align-items-center justify-content-center" style={{ gap: ".5rem" }}>
                <Button onClick={() => decreaseCartQuantity(item.id)}>-</Button>
                <div> <span className="fs-3">{quantity}</span> in cart  </div>
                <Button onClick={() => increaseCartQuantity(item.id, item.name, item.price)}>+</Button>
              </div>
              <Button 
                onClick={() => removeFromCart(item.id)}
                variant="danger"
                size="sm"
              >
                Remove
              </Button>
            </div>
          )
          }

          
        </div>

      </Card.Body>
    </Card>
  );
}











