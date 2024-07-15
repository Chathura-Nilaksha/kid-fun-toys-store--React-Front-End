import { ReactNode, createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
interface ShoppingCartContext {
    // openCart: () => void,
    // closeCart: () => void,
    getItemQuantity(id: number) : number,    // getItemQuantity:(id: number) => number,
    increaseCartQuantity: (id: number) => void,
    decreaseCartQuantity: (id: number) => void,
    removeFromCart: (id: number) => void,
    cartQuantity: number,
    cartItems: CartItem []
}
interface ShoppingCartProviderProps {
    children : ReactNode
}
type CartItem = {
    id: number,
    quantity: number
}
const ShoppingCartContext  = createContext( {} as ShoppingCartContext)


export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({children}:ShoppingCartProviderProps){
    // const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", []); 

    const cartQuantity = cartItems.reduce((quantity, item) => (item.quantity+ quantity), 0);
    
    function getItemQuantity(id: number){
        return  cartItems.find(item => item.id === id)?.quantity || 0
    }
    function increaseCartQuantity(id: number) {
        setCartItems(currItems => {
            if(currItems.find(item => item.id === id) == null){  //item.id===id--->check.here id=items inside existing cart.
                return [...currItems, {id, quantity:1}];
            }else{
                return currItems.map(item => {
                    if(item.id === id){ return {...item, quantity : item.quantity + 1};}
                    else{ return item; }
                })
            }
        }
        )
    }
    function decreaseCartQuantity(id: number) {
        setCartItems(currItems => {
            if(currItems.find(item => item.id === id)?.quantity === 1){ //here-if qty=1,this item will remove from cart,as qty goes 1 to 0.
                return currItems.filter(item => item.id !== id); // return- the new list of items exept the item belongs to this id.
            }else{
                return currItems.map(item => {
                    if(item.id === id){ return {...item, quantity : item.quantity - 1};}
                    else{ return item; }
                })
            }
        }
        )
    }
    function removeFromCart(id: number){
        setCartItems(currItems => {
            return currItems.filter(item => item.id != id)
        })        
    }    
    return(
        <ShoppingCartContext.Provider value = {{getItemQuantity,
                                                increaseCartQuantity,
                                                decreaseCartQuantity,
                                                removeFromCart,
                                                cartQuantity,
                                                cartItems}}>
            {children}
        </ShoppingCartContext.Provider>
    )
}