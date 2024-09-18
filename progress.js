class Progress {
    constructor(elementId) {
        this.progressBlock = document.getElementById(elementId);
        this.input = this.progressBlock.querySelector('#progress-value');
        this.animateCheckbox = this.progressBlock.querySelector('#animate-progress');
        this.hideCheckbox = this.progressBlock.querySelector('#hide-progress');
        this.circle = this.progressBlock.querySelector('.circle-svg');
        this.bar = this.progressBlock.querySelector('.bar');
        this.radius = this.bar.getAttribute('r');
        this.reg = /^[0-9]$|^[1-9][0-9]$|^(100)$/;

        this.addEventListeners();
    }

    addEventListeners() {
        this.input.oninput = () => this.updateProgress();
        this.animateCheckbox.onchange = () => this.toggleAnimation();
        this.hideCheckbox.onchange = () => this.toggleVisibility();
    }

    circumference() {
        return this.radius * 2 * Math.PI;
    }

    updateProgress() {
        if (this.reg.test(this.input.value)) {
            let offset = this.circumference() - (this.circumference() * this.input.value / 100);
            this.bar.style.strokeDashoffset = offset;
            this.input.style.border = '1px solid black';
        } else {
            this.input.style.border = '1px solid red';
        }
    }

    toggleAnimation = () => this.animateCheckbox.checked ? this.bar.classList.add('start') : this.bar.classList.remove('start');

    toggleVisibility() {
        if (this.hideCheckbox.checked) {
            this.input.disabled = true;
            this.animateCheckbox.disabled = true;
            this.animateCheckbox.checked = false;
            this.bar.classList.remove('start');
            this.circle.style.visibility = 'hidden';
        } else {
            this.input.disabled = false;
            this.animateCheckbox.disabled = false;
            this.circle.style.visibility = 'visible';
        }
    }

    setProgress(value) {
        if (this.reg.test(value)) {
            this.input.value = value;
            this.updateProgress();
        } else {
            console.log('Недопустимое числовое значение');
        }
    }

    setAnimation(state) {
        this.animateCheckbox.checked = state;
        this.toggleAnimation();
    }

    setVisibility(visible) {
        this.hideCheckbox.checked = !visible;
        this.toggleVisibility();
    }
}

const progress = new Progress('progress-block');

/* API
    * @param {number} value - Число от 0 до 100.
    * progress.setProgress(value);
    - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    * @param {boolean} state - Включить/выключить анимацию вращения круга.
    * progress.setAnimation(state);
    - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    * @param {boolean} visible - Показать/скрыть круг.
    * progress.setVisibility(visible);
*/