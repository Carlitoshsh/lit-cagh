import { css, html, LitElement } from "lit-element";

export class Cal extends LitElement {

    calOptions = [
        'AC', '()', '%', '/',
        '7', '8', '9', '*',
        '4', '5', '6', '-',
        '1', '2', '3', '+',
        '0', '.', 'DEL', '=',
    ]

    static styles = css`
        :host{
            font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            padding: 1rem;
            border: 2px solid lightblue;
            border-radius: 1rem;
            background-color: #d4ecff;
            width: fit-content;
        }
        .input-cal {
            border: 2px solid darkgrey;
            background-color: gray;
            color: white;
            height: 3rem;
            border-radius: inherit;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            font-size: x-large;
            padding: 0 1rem;
        }
        .test {
            height: 3rem;
            width: 3rem;
            border: 2px solid lightblue;
            background-color: #e3ffe3;
            border-radius: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: x-large;
        }
        .grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            gap: 1rem;
        }
    `

    static properties = {
        calInput: {},
        expression: {}
    }

    constructor() {
        super();
        this.expression = "";
        this.calInput = "";
    }

    onInput(e) {
        const inputel = e.target;
        this.calInput = inputel.value;
    }

    onButtonClicked(e) {
        const content = e.target.textContent;
        if (content === "=") {
            this.calInput = eval(this.expression);
            this.expression = ""
        }
        else if (content === "AC") {
            this.expression = ""
            this.calInput = 0
        } else if (content === "DEL") {
            this.expression = this.expression.slice(0, -1)
            this.calInput = this.expression;
        } else {
            this.expression += content;
            this.calInput = this.expression;
        }
    }

    render() {
        return html`
            <div class="input-cal">${this.calInput}</div>
            <div class="grid">
                ${this.calOptions.map((y) => html`
                    <div @click=${this.onButtonClicked} class="test">${y}</div>
                `)}
            </div>
        `
    }
}

customElements.define('my-cal', Cal)