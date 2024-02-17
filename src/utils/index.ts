export const formatCurrencyVND = (value: number) => {
    return value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};

export const validateRules = {
    required: (value: any) => (value ? "" : "Please enter this field"),
    email: (value: string) => {
        // eslint-disable-next-line no-useless-escape
        const syntax = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return syntax.test(value) ? "" : "Invalid email (includes @ and .domain)";
    },
    min: (min: number) => {
        return (value: string) => (value.length >= min ? "" : `Minimum ${min} characters`);
    },
    max: (max: number) => {
        return (value: string) => (value.length <= max ? "" : `Maximum ${max} characters`);
    },
};
