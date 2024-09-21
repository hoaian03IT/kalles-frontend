import { Modal } from "react-bootstrap";
import { CustomInput } from "./form/CustomInput";
import { CartItem } from "~/types";

type Props = {
    amount: number;
    cartItems: CartItem[];
    show: boolean;
    onHide: () => void;
};

export const ModalBanking = ({ amount, cartItems, onHide, show }: Props) => {
    return (
        <Modal show={show} centered={true} size="lg">
            <Modal.Header>
                <Modal.Title className="ms-auto me-auto">VNPay Banking</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-2">
                    <label className="d-block">Amount</label>
                    <input className="w-100 px-2 py-2" type="text" value={amount} disabled />
                </div>
                <div className="mb-2">
                    <label className="d-block">Order type</label>
                    <input className="w-100 px-2 py-2" type="text" value="Delivery" disabled />
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                        rows={10}
                        className="w-100 px-2 py-2"
                        value={`Check out \nProducts:\n${cartItems.map(
                            (item) =>
                                `${item.product.name} - ${item.product.color.name} - ${item.product.size.name} - Quantity: ${item.quantity}`
                        )}`}></textarea>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={onHide}>
                    Cancel
                </button>
                <button className="btn btn-primary">Confirm</button>
            </Modal.Footer>
        </Modal>
    );
};
