import React from 'react';
const ProgressCard = (props) => {
    const { title, number, color, unit } = props;

    return (        
        <div className="card-body">
            <h4 className="card-title">{title}</h4>
            <h3 className="fw-bold">{number} {unit}</h3>
            {/* Optional progress bar can be added if needed */}
        </div>  
    )
}

export { ProgressCard };

const styles = `
.progress-bar.progress-animated {
    animation: progressAnimation 2s ease-in-out forwards;
}

@keyframes progressAnimation {
    from { width: 0%; }
    to { width: props.percent; }
}

`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);