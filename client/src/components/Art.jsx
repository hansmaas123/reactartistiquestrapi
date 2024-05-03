import PropTypes from "prop-types";

const Art = ({ circles, colour, strokeDistance, angle, radiusX, radiusY }) => {

    const circleArray = new Array(circles).fill('I am a circle')
    console.log(circleArray)

    return (
        <div className="svg__wrapper">
            <svg width={'100%'} height={'100%'}>
                {angle === true ? (
                    circleArray.map((_, index) => (
                        <rect
                            key={index}
                            rx={radiusX}
                            ry={radiusY}
                            fill='none'
                            stroke={colour}
                            strokeWidth={6}
                            width={(index * 20) + (strokeDistance * strokeDistance)}
                            height={(index * 20) + (strokeDistance * strokeDistance)}
                        />))

                ) : (
                    circleArray.map((_, index) => (
                        <circle
                            key={index}
                            cx={radiusX}
                            cy={radiusY}
                            fill='none'
                            stroke={colour}
                            strokeWidth={6}
                            r={(index * 20) + (strokeDistance * strokeDistance)}
                        />
                    ))
                )}
            </svg>
        </div>
    );
};
export default Art;

Art.propTypes = {
    circles: PropTypes.number.isRequired,
    strokeDistance: PropTypes.number.isRequired,
    colour: PropTypes.string.isRequired,
    radiusX: PropTypes.string.isRequired,
    radiusY: PropTypes.string.isRequired,
    angle: PropTypes.bool.isRequired,
};
