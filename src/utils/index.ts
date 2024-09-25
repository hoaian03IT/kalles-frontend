export const formatCurrency = (value: number) => {
    return value.toLocaleString("vi", { style: "currency", currency: "VND" });
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

export const getTimeAgo = (oldDate: Date) => {
    const MAXIMUM_DAY_AGO = 7;
    const rtf = new Intl.RelativeTimeFormat("en", { style: "short" });

    const now = new Date();
    const seconds = Math.floor((now.getTime() - oldDate.getTime()) / 1000);

    let interval = Math.floor(seconds / 84600); // 84600 is seconds in one day
    if (interval > MAXIMUM_DAY_AGO) {
        return oldDate.toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    }

    if (interval >= 1) {
        return rtf.format(-interval, "day");
    }

    interval = Math.floor(seconds / 3600); // 3600 is seconds in one hour
    if (interval >= 1) {
        return rtf.format(-interval, "hour");
    }

    interval = Math.floor(seconds / 60); // 60 is seconds in one minute
    if (interval >= 1) {
        return rtf.format(-interval, "minute");
    }

    return rtf.format(-Math.floor(seconds), "second");
};
