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
    circles: PropTypes.number.isRequired,
    strokeDistance: PropTypes.number.isRequired,
    colour: PropTypes.string.isRequired,
    angle: PropTypes.bool.isRequired,
    radiusX: PropTypes.string.isRequired,
    radiusY: PropTypes.string.isRequired,
    handleColourChange: PropTypes.func.isRequired,
    handleSliderAmountChange: PropTypes.func.isRequired,
    handleSliderStrokeDistanceChange: PropTypes.func.isRequired,
    handleCheckboxChange: PropTypes.func.isRequired,
    handleSliderRadiusXChange: PropTypes.func.isRequired,
    handleSliderRadiusYChange: PropTypes.func.isRequired,

}