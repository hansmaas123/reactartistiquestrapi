import PropTypes from 'prop-types'

function Slider({ circles, strokeDistance, colour, angle, radiusX, radiusY, handleSliderAmountChange, handleSliderStrokeDistanceChange, handleColourChange, handleCheckboxChange, handleSliderRadiusXChange, handleSliderRadiusYChange }) {
    return (
        <>
            <label className="label">
                <span>Amount</span>
                <input
                    type="range"
                    min={1}
                    max={50}
                    value={circles}
                    id="sliderAmount"
                    onChange={handleSliderAmountChange}
                />
            </label>
            <label className="label">
                <span>Expand</span>
                <input
                    type="range"
                    min={0}
                    max={20}
                    value={strokeDistance}
                    id="sliderStroke"
                    onChange={handleSliderStrokeDistanceChange}
                />
            </label>
            <label className="label">
                <span>Colour</span>
                <input
                    type="color"
                    value={colour}
                    id="Colour"
                    onChange={handleColourChange}
                />
            </label>
            <label className="label">
                <span>Switch angle</span>
                <input
                    className='checkbox'
                    type="checkbox"
                    id="shape"
                    onChange={handleCheckboxChange}
                />
            </label>
            {
                angle && (
                    <>
                        <label className="label">
                            <span>X-radius</span>
                            <input
                                type="range"
                                min='1%'
                                max='100%'
                                value={radiusX}
                                id="sliderRadiusX"
                                onChange={handleSliderRadiusXChange}
                            />
                        </label>
                        <label className="label">
                            <span>Y-radius</span>
                            <input
                                type="range"
                                min='1%'
                                max='100%'
                                value={radiusY}
                                id="sliderRadiusY"
                                onChange={handleSliderRadiusYChange}
                            />
                        </label>
                    </>

                )
            }
        </>
    )
}

export default Slider

Slider.propTypes = {
    circles: PropTypes.number,
    strokeDistance: PropTypes.number,
    colour: PropTypes.string,
    angle: PropTypes.bool,
    radiusX: PropTypes.string,
    radiusY: PropTypes.string,
    handleColourChange: PropTypes.func,
    handleSliderAmountChange: PropTypes.func,
    handleSliderStrokeDistanceChange: PropTypes.func,
    handleCheckboxChange: PropTypes.func,
    handleSliderRadiusXChange: PropTypes.func,
    handleSliderRadiusYChange: PropTypes.func,

}