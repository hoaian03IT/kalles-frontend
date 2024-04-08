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

export const getBase64 = (file: File) => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

export const getTimeAgo = (date: Date) => {
    if (!date) {
        return "";
    }
    const currentTime = new Date();
    if (currentTime.getDate() - date.getDate() <= 0) {
        if (currentTime.getHours() - date.getHours() <= 0) {
            if (currentTime.getMinutes() - date.getMinutes() <= 0) {
                if (currentTime.getSeconds() - date.getSeconds() <= 60) {
                    return `${currentTime.getSeconds() - date.getSeconds()} seconds ago`;
                }
            } else {
                return `${currentTime.getMinutes() - date.getMinutes()} minutes ago`;
            }
        } else {
            return `${currentTime.getHours() - date.getHours()} hours ago`;
        }
    } else if (currentTime.getDate() - date.getDate() <= 2) {
        return `${currentTime.getDate() - date.getDate()} days ago`;
    } else {
        return `${date.getMonth() + 1}/${date.getDay()}/${date.getFullYear()}`;
    }
};
