import classNames from "classnames/bind";
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import styles from "~/styles/InputRangeDoubleSlide.module.scss";

const cx = classNames.bind(styles);

type valueInput = { min: number; max: number };

type Props = {
    value: valueInput;
    setValue: Dispatch<SetStateAction<valueInput>>;
    min: number;
    max: number;
    step: number;
    gap: number;
};

export const InputRangeDoubleSlide = ({ min, max, step, gap, value, setValue }: Props) => {
    const [percentSmaller, setPercentSmaller] = useState(0);
    const [percentBigger, setPercentBigger] = useState(100);

    useEffect(() => {
        setPercentSmaller((value.min / max) * 100);
        setPercentBigger((1 - value.max / max) * 100);
    }, [max, value]);

    const handleInputSmallerInput = (e: FormEvent<HTMLInputElement>) => {
        if (Number(e.currentTarget.value) + gap > value.max) {
            setValue({ ...value, min: value.max - gap });
        } else {
            setValue({ ...value, min: Number(e.currentTarget.value) });
        }
    };

    const handleInputBiggerInput = (e: FormEvent<HTMLInputElement>) => {
        if (Number(e.currentTarget.value) - gap < value.min) {
            setValue({ ...value, max: value.min + gap });
        } else {
            setValue({ ...value, max: Number(e.currentTarget.value) });
        }
    };

    return (
        <div className={cx("wrapper")}>
            <div className={cx("line")}>
                <div className={cx("process")} style={{ left: percentSmaller + "%", right: percentBigger + "%" }}></div>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                className={cx("range", "range-first")}
                value={value.min}
                onChange={handleInputSmallerInput}
            />
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                className={cx("range", "range-second")}
                value={value.max}
                onChange={handleInputBiggerInput}
            />
        </div>
    );
};
