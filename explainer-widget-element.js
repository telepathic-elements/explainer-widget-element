import {TelepathicElement} from "../telepathic-element/telepathic-element.js";

export default class ExplainerWidgetElement extends TelepathicElement{
    static describe(){return `ExplainerWidgetElement provides a widget that shows this source code of any telepathic-element.`};
    constructor(){
        super();
        //Forward declare template vars
        this.source ={
            code : "",
            jsCount : 30,
            htmlCount : 30,
            description : "",
            className : "",
            tagName : "",
            outerHTML : "",
            html : ""

        }
        this.toExplain = {}; 
    }

    async init(){
        this.toExplain = this.firstElementChild;
        console.log("explainer widget explaining: ",this.toExplain);
        this.source.tagName = this.toExplain.tagName.toLowerCase();
        console.log("source before: ",this.source);
        if(!window.customElements.get(this.source.tagName)){
            await window.customElements.whenDefined(this.source.tagName);
        }
        await this.prepSource();
    }

    async prepSource(){
        //this.toExplain has likely changed by the time we get here
        this.toExplain = this.firstElementChild;
        this.source.code = window.customElements.get(this.source.tagName);    
        this.source.outerHTML  = this.toExplain.outerHTML;
        this.source.html = this.toExplain.innerHTML;
        this.source.className = window[this.source.tagName]; 
        this.source.templateFileName = window[this.source.className];
        this.source.html = window[this.source.templateFileName];
        this.source.jsCount = this.source.code.toString().split(/\r\n|\r|\n/).length + 1;
        console.log(this.source.tagName+" is ",this.source.code);
        this.source.description = this.source.code.describe();
        console.log("source after: ",this.source);
    }
}

