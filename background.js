// background.js - 紫色流星和花瓣背景
class MeteorPetalBackground {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.meteors = [];
        this.petals = [];
        this.stars = [];
        this.lastTime = 0;
        this.resizeTimeout = null;

        this.init();
    }

    init() {
        this.resizeCanvas();
        this.createStars(100);
        this.startAnimation();
        this.bindEvents();
    }

    bindEvents() {
        window.addEventListener('resize', () => {
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(() => {
                this.resizeCanvas();
                this.createStars(100);
            }, 250);
        });

        // 随机生成流星
        setInterval(() => {
            if (this.meteors.length < 20) { // 最多10个流星
                this.createMeteor();
            }
        }, 1000 + Math.random() * 700); // 生成间隔

        // 随机生成花瓣
        setInterval(() => {
            if (this.petals.length < 20) { // 限制最多20个花瓣
                this.createPetal();
            }
        }, 500 + Math.random() * 700);
    }

    resizeCanvas() {
        this.canvas.width = this.canvas.parentElement.clientWidth;
        this.canvas.height = this.canvas.parentElement.clientHeight;
    }

    createStars(count) {
        this.stars = [];
        for (let i = 0; i < count; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 1.5 + 0.5,
                opacity: Math.random() * 0.6 + 0.4,
                twinkleSpeed: Math.random() * 0.02 + 0.01
            });
        }
    }

    createMeteor() {
        const startX = Math.random() * this.canvas.width;
        const startY = 0;
        const angle = (Math.PI / 4) + (Math.random() - 0.5) * (Math.PI / 6);
        const speed = 4 + Math.random() * 5;
        const length = 70 + Math.random() * 100;

        this.meteors.push({
            x: startX,
            y: startY,
            speedX: Math.cos(angle) * speed,
            speedY: Math.sin(angle) * speed,
            length: length,
            opacity: 0.8 + Math.random() * 0.2,
            color: this.getMeteorColor(),
            age: 0,
            maxAge: 100 + Math.random() * 150
        });
    }

    getMeteorColor() {
        const colors = [
            'rgba(186, 85, 211, 1)',    // 紫色
            'rgba(138, 43, 226, 1)',    // 蓝紫色
            'rgba(153, 50, 204, 1)',    // 深紫色
            'rgba(147, 112, 219, 1)',   // 中紫色
            'rgba(221, 160, 221, 1)'    // 浅紫色
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    createPetal() {
        const types = ['cherry', 'rose', 'sakura'];
        const type = types[Math.floor(Math.random() * types.length)];

        this.petals.push({
            x: Math.random() * this.canvas.width,
            y: -80,
            type: type,
            size: 10 + Math.random() * 30,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: 0.3 + Math.random() * 0.7,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.05,
            opacity: 0.4 + Math.random() * 0.4,
            swing: 0,
            swingSpeed: 0.01 + Math.random() * 0.02,
            swingAmplitude: 0.5 + Math.random() * 1.5
        });
    }

    drawStar(star, time) {
        const twinkle = Math.sin(time * star.twinkleSpeed) * 0.3 + 0.7;
        this.ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`;
        this.ctx.beginPath();
        this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        this.ctx.fill();
    }

    drawMeteor(meteor) {
        this.ctx.save();

        // 绘制流星头部
        this.ctx.fillStyle = meteor.color.replace('1)', `${meteor.opacity})`);
        this.ctx.beginPath();
        this.ctx.arc(meteor.x, meteor.y, 5, 0, Math.PI * 2);
        this.ctx.fill();

        // 绘制流星尾迹
        const gradient = this.ctx.createLinearGradient(
            meteor.x, meteor.y,
            meteor.x - Math.cos(Math.atan2(meteor.speedY, meteor.speedX)) * meteor.length,
            meteor.y - Math.sin(Math.atan2(meteor.speedY, meteor.speedX)) * meteor.length
        );

        gradient.addColorStop(0, meteor.color.replace('1)', `${meteor.opacity})`));
        gradient.addColorStop(1, meteor.color.replace('1)', '0)'));

        this.ctx.strokeStyle = gradient;
        this.ctx.lineWidth = 8;
        this.ctx.lineCap = 'round';
        this.ctx.beginPath();
        this.ctx.moveTo(meteor.x, meteor.y);
        this.ctx.lineTo(
            meteor.x - Math.cos(Math.atan2(meteor.speedY, meteor.speedX)) * meteor.length,
            meteor.y - Math.sin(Math.atan2(meteor.speedY, meteor.speedX)) * meteor.length
        );
        this.ctx.stroke();

        this.ctx.restore();
    }

    drawPetal(petal, time) {
        this.ctx.save();
        this.ctx.translate(petal.x, petal.y);
        this.ctx.rotate(petal.rotation);

        petal.swing += petal.swingSpeed;
        const swingOffset = Math.sin(petal.swing) * petal.swingAmplitude;
        this.ctx.translate(swingOffset, 0);

        this.ctx.fillStyle = this.getPetalColor(petal.type, petal.opacity);

        // 绘制花瓣形状
        this.ctx.beginPath();

        switch (petal.type) {
            case 'cherry':
                // 樱花花瓣形状
                this.ctx.ellipse(0, 0, petal.size, petal.size * 0.6, 0, 0, Math.PI * 2);
                break;
            case 'rose':
                // 玫瑰花瓣形状
                for (let i = 0; i < 5; i++) {
                    const angle = (i * Math.PI * 2) / 5;
                    const x = Math.cos(angle) * petal.size;
                    const y = Math.sin(angle) * petal.size;
                    if (i === 0) this.ctx.moveTo(x, y);
                    else this.ctx.lineTo(x, y);
                }
                this.ctx.closePath();
                break;
            case 'sakura':
            default:
                // 心形花瓣
                for (let i = 0; i < 20; i++) {
                    const t = i / 20 * Math.PI * 2;
                    const x = 16 * Math.pow(Math.sin(t), 3);
                    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
                    const scale = petal.size / 16;
                    if (i === 0) this.ctx.moveTo(x * scale, y * scale);
                    else this.ctx.lineTo(x * scale, y * scale);
                }
                this.ctx.closePath();
                break;
        }

        this.ctx.fill();

        // 添加花瓣纹理
        this.ctx.strokeStyle = this.getPetalColor(petal.type, petal.opacity * 0.7);
        this.ctx.lineWidth = 0.5;
        this.ctx.stroke();

        this.ctx.restore();
    }

    getPetalColor(type, opacity) {
        const colors = {
            'cherry': `rgba(255, 182, 193, ${opacity})`,    // 樱花粉
            'rose': `rgba(219, 112, 147, ${opacity})`,      // 玫瑰粉
            'sakura': `rgba(255, 105, 180, ${opacity})`     // 亮粉色
        };
        return colors[type] || colors.sakura;
    }

    updateMeteors() {
        for (let i = this.meteors.length - 1; i >= 0; i--) {
            const meteor = this.meteors[i];
            meteor.x += meteor.speedX;
            meteor.y += meteor.speedY;
            meteor.age++;

            // 淡出效果
            meteor.opacity = Math.max(0, 1 - (meteor.age / meteor.maxAge));

            // 移除不可见的流星
            if (meteor.y > this.canvas.height + 50 ||
                meteor.x < -50 ||
                meteor.x > this.canvas.width + 50 ||
                meteor.opacity <= 0) {
                this.meteors.splice(i, 1);
            }
        }
    }

    updatePetals() {
        for (let i = this.petals.length - 1; i >= 0; i--) {
            const petal = this.petals[i];
            petal.x += petal.speedX;
            petal.y += petal.speedY;
            petal.rotation += petal.rotationSpeed;

            // 花瓣轻微飘动
            petal.speedX += Math.sin(Date.now() * 0.001 + i) * 0.01;

            // 移除屏幕外的花瓣
            if (petal.y > this.canvas.height + 80 ||
                petal.x < -80 ||
                petal.x > this.canvas.width + 80) {
                this.petals.splice(i, 1);
            }
        }
    }

    drawBackground(time) {
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#0f3b5f');    // 深蓝色
        gradient.addColorStop(0.5, '#1e6fa8');  // 中蓝色
        gradient.addColorStop(1, '#2a9ddf');    // 浅蓝色

        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // 添加星云效果
        this.drawNebula();
    }

    drawNebula() {
        // 绘制几个圆形星云
        const nebulae = [
            { x: this.canvas.width * 0.2, y: this.canvas.height * 0.3, size: 150, color: 'rgba(30, 111, 168, 0.1)' },  // 蓝色
            { x: this.canvas.width * 0.8, y: this.canvas.height * 0.2, size: 100, color: 'rgba(42, 157, 223, 0.08)' }, // 浅蓝色
            { x: this.canvas.width * 0.3, y: this.canvas.height * 0.7, size: 120, color: 'rgba(15, 59, 95, 0.12)' }   // 深蓝色
        ];

        nebulae.forEach(nebula => {
            const gradient = this.ctx.createRadialGradient(
                nebula.x, nebula.y, 0,
                nebula.x, nebula.y, nebula.size
            );
            gradient.addColorStop(0, nebula.color);
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(nebula.x, nebula.y, nebula.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }

    animate(currentTime) {
        if (!this.lastTime) this.lastTime = currentTime;
        const deltaTime = (currentTime - this.lastTime) * 0.001;

        // 清空画布
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 绘制背景
        this.drawBackground(currentTime);

        // 绘制星空
        this.stars.forEach(star => {
            this.drawStar(star, currentTime);
        });

        // 更新和绘制流星
        this.updateMeteors();
        this.meteors.forEach(meteor => {
            this.drawMeteor(meteor);
        });

        // 更新和绘制花瓣
        this.updatePetals();
        this.petals.forEach(petal => {
            this.drawPetal(petal, currentTime);
        });

        this.lastTime = currentTime;
        requestAnimationFrame(this.animate.bind(this));
    }

    startAnimation() {
        requestAnimationFrame(this.animate.bind(this));
    }
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('butterflyCanvas');
    if (canvas) {
        window.backgroundEffect = new MeteorPetalBackground(canvas);
    }
});