import {TelepathicElement} from "../telepathic-element/telepathic-element.js";

export class ExplainerWidget extends TelepathicElement{
    constructor(){
        super();
        this.source = {};
        
    }

    async connectedCallback(){
        this.init();
    }

    async init(){

        this.sourceName = this.getAttribute("explain");
        this.filePath = `${this.sourceName}/${this.sourceName}`;
        this.module = await import(`../${this.filePath}.js`);
        this.source.description = await this.module.describe;
        this.source.className = await this.module.default();
        console.log("className: ",this.source.className);
        this.handle = this.module[this.source.className];
        console.log("handle: ",this.handle);
        
        console.log("instance: ",this.instance);
        
        this.sourceHtml = await this.loadFile(`${this.filePath}.html`);
        this.source.js = `${this.handle}`;
        this.source.jsCount =  this.source.js.split(/\r\n|\r|\n/).length;
        this.source.html = `${this.sourceHtml}`;
        this.source.htmlCount = this.source.html.split(/\r\n|\r|\n/).length;
        //this.source.js = `${this.sourceJS}`;
        console.log("explainer widget explaining: ",this.source);
        
        await this.loadTemplate("explainer-widget/explainer-widget.html");
        await this.prepareTemplate();
        
    }
}
try{
    window.customElements.define('explainer-widget', ExplainerWidget);
}catch(err){
    //Ignore, it comes here if this file is imported more than once
}
export default () => { return `ExplainerWidget`};
export const describe = `ExplainerWidget provides a widget that shows this source code of any telepathic-element.`;