import { Modal } from "react-bootstrap";
import { fetchPaymentURL } from "~/api";
import { CartItem } from "~/types";
import { formatCurrency } from "~/utils";

type Props = {
    amount: number;
    cartItems: CartItem[];
    show: boolean;
    onHide: () => void;
};

export const ModalBanking = ({ amount, cartItems, onHide, show }: Props) => {
    const description = `Check out \nProducts:\n${cartItems.map(
        (item) =>
            `${item.product.name} - ${item.product.color.name} - ${item.product.size.name} - Quantity: ${item.quantity}`
    )}`;
    const orderType = "Delivery";
    const handleRedirect = async () => {
        const url = await fetchPaymentURL({
            amount: amount,
            orderDescription: description,
            orderType,
            returnUrl: "localhost:3000/transaction",
        });
        window.open(url, "_blank");
    };

    return (
        <Modal show={show} centered={true} size="lg">
            <Modal.Header>
                <Modal.Title className="ms-auto me-auto">VNPay Banking</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-2">
                    <label className="d-block">Amount</label>
                    <input className="w-100 px-2 py-2" type="text" value={formatCurrency(amount)} disabled />
                </div>
                <div className="mb-2">
                    <label className="d-block">Order type</label>
                    <input className="w-100 px-2 py-2" type="text" value="Delivery" disabled />
                </div>
                <div>
                    <label>Description</label>
                    <textarea rows={10} className="w-100 px-2 py-2" value={description}></textarea>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={onHide}>
                    Cancel
                </button>
                <button className="btn btn-primary" onClick={handleRedirect}>
                    Confirm
                </button>
            </Modal.Footer>
        </Modal>
    );
};
