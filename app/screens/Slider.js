import React, { useCallback, setLow, setHigh } from 'react';
import RangeSlider from 'rn-range-slider';
import { Thumb, Rail, RailSelected, Notch, Label } from 'rn-widgets-demo';

export default function Slider(props) {
    const renderThumb = useCallback(() => <Thumb/>, []);
    const renderRail = useCallback(() => <Rail/>, []);
    const renderRailSelected = useCallback(() => <RailSelected/>, []);
    const renderLabel = useCallback(value => <Label text={value}/>, []);
    const renderNotch = useCallback(() => <Notch/>, []);
    const handleValueChange = useCallback((low, high) => {
      setLow(low);
      setHigh(high);
    }, []);


    return <RangeSlider
            // style={}
            min={props.min}
            max={props.max}
            step={1}
            floatingLabel
            renderThumb={renderThumb}
            renderRail={renderRail}
            renderRailSelected={renderRailSelected}
            renderLabel={renderLabel}
            renderNotch={renderNotch}
            onValueChanged={handleValueChange} />;
}