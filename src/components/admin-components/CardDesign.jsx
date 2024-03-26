import React from 'react';

const ProgressCard = (props) => {
    const { percent, color } = props;

    const style = {
        width: percent,
        backgroundColor: color
    };

    return (        
        <div className="card-body">
            <h4 className="card-title">{props.title}</h4>
            <h3 className="fw-bold">{props.number}</h3>
            <div className="progress mb-2">
                <div className={`progress-bar progress-animated`} style={style}></div>
            </div>
            <small>{props.percent} Increase in 20 Days</small>
        </div>  
    )
}

export  {ProgressCard};

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