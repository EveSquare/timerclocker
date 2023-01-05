import React, { useRef, useEffect, memo } from 'react';

const Clocker = (props) => {
    const canvasEl = useRef(null);
    const videoEl = useRef(null);

    const { hours, minutes, seconds } = props;

    function zeroPadding(NUM, LEN) {
        return (Array(LEN).join('0') + NUM).slice(-LEN);
    }

    const drawFace = (canvas, ctx, radius) => {
        const pos = canvas.height / 2;
        ctx.beginPath();
        ctx.arc(pos, pos, radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.lineWidth = radius * 0.1;
        ctx.strokeStyle = '#333';
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
        ctx.fillStyle = '#333';
        ctx.fill();
        return;
    }

    const drawNumbers = (canvas, ctx, radius) => {
        let num, ang;
        const pos = canvas.height / 2;

        ctx.font = radius * 0.15 + "px arial";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        for (num = 1; num < 13; num++) {
            ang = num * Math.PI / 6;
            ctx.rotate(ang);
            ctx.translate(0, -radius * 0.85);
            ctx.rotate(-ang);
            ctx.fillText(num.toString(), pos, pos);
            ctx.rotate(ang);
            ctx.translate(0, radius * 0.85);
            ctx.rotate(-ang);
        }
        return;
    }

    const drawHand = (ctx, pos, length, width) => {
        ctx.translate(150, 150);
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.lineCap = "round";
        ctx.moveTo(150, 150);
        ctx.rotate(pos);
        ctx.lineTo(0, -length);
        ctx.stroke();
        ctx.rotate(-pos);
    }

    const drawTime = (canvas, ctx, radius) => {
        const now = new Date(`2023-01-01T${zeroPadding(hours, 2)}:${zeroPadding(minutes, 2)}:${zeroPadding(seconds, 2)}`);
        let hour = now.getHours();
        let minute = now.getMinutes();
        let second = now.getSeconds();
        // hour
        hour = hour % 12;
        hour = (hour * Math.PI / 6) +
            (minute * Math.PI / (6 * 60)) +
            (second * Math.PI / (360 * 60));
        drawHand(ctx, hour, radius * 0.5, radius * 0.07);
        // minute
        minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
        drawHand(ctx, minute, radius * 0.8, radius * 0.07);

        // second
        second = (second * Math.PI / 30);
        drawHand(ctx, second, radius * 0.9, radius * 0.02);
    }

    const drawClock = (canvas, context) => {
        const ctx = context;
        let radius = canvas.height / 2;
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        // ctx.translate(canvas.height /2, radius);
        radius = radius * 0.90
        drawFace(canvas, ctx, radius);
        drawNumbers(canvas, ctx, radius);
        drawTime(canvas, ctx, radius);
    }

    useEffect(() => {
        console.log('drawClock');
        const canvas = canvasEl.current;
        const context = canvas.getContext('2d');
        drawClock(canvas, context)
    });

    return (
        <div className="clocker">
            <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
            <canvas id="canvas" ref={canvasEl} width="300" height="300" />
            <video id="video" ref={videoEl} width="300" height="300"></video>
        </div>
    )
}

export default Clocker;