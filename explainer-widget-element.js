import {TelepathicElement} from "../telepathic-element/telepathic-element.js";

export default class ExplainerWidgetElement extends TelepathicElement{
    static describe(){return `ExplainerWidgetElement provides a widget that shows this source code of any telepathic-element.`};
    constructor(){
        //super(null,false, true);
        //Forward declare template vars
        super();
        this.source ={
            code : "",
            jsCount : 30,
            lineCount : 30,
            description : "",
            className : "",
            tagName : "",
            outerHTML : "",
            template : ""

        }
        this.toExplain = {};
    }

    async onReady(){
        let slot = this.$.querySelector('slot');
        this.toExplain = slot.assignedNodes()[0];
        console.log("explainer widget explaining: ",this.toExplain);
        this.source.tagName = this.toExplain.tagName.toLowerCase();
        console.log("source before: ",this.source);
        if(!window.customElements.get(this.source.tagName)){
            await window.customElements.whenDefined(this.source.tagName);
        }
        await this.prepSource();
    }

    async prepSource(){
        /*
        this.source.code = window.customElements.get(this.source.tagName);    
        this.source.outerHTML  = this.toExplain.outerHTML;
        this.source.className = this.toExplain.className; 
        this.source.templateFileName = toExplain.templateFileName;
        this.source.template = this.toExplain.template;
        if(!this.source.template || this.source.template == "undefined"){
            this.source.template = await this.loadFile(this.source.templateFileName);
        }
        this.source.jsCount = this.source.code.toString().split(/\r\n|\r|\n/).length + 1;
        this.source.lineCount = this.source.template.split(/\r\n|\r|\n/).length + 1;
        console.log(this.source.tagName+" is ",this.source.code);
        this.source.description = this.source.code.describe();
        console.log("source after: ",this.source);
        this.removeChild(this.querySelector(this.source.tagName));
        */
    }
}


