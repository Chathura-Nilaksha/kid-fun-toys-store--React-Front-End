import clothifyPicture from "../assets/clothify-main.jpg";


export default function ClothifyHeader() {

    return (
        <div>
            <img src={clothifyPicture} width={500} height={200} alt="Clothify Store" />
        </div>
    );
}
