(self.webpackChunkportofolio=self.webpackChunkportofolio||[]).push([[446],{2473:function(w,_){var v;void 0!==(v=function(){"use strict";function Z(n,a,p){var r=new XMLHttpRequest;r.open("GET",n),r.responseType="blob",r.onload=function(){f(r.response,a,p)},r.onerror=function(){console.error("could not download file")},r.send()}function q(n){var a=new XMLHttpRequest;a.open("HEAD",n,!1);try{a.send()}catch(p){}return 200<=a.status&&299>=a.status}function m(n){try{n.dispatchEvent(new MouseEvent("click"))}catch(p){var a=document.createEvent("MouseEvents");a.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),n.dispatchEvent(a)}}var u="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof global&&global.global===global?global:void 0,h=u.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),f=u.saveAs||("object"!=typeof window||window!==u?function(){}:"download"in HTMLAnchorElement.prototype&&!h?function(n,a,p){var r=u.URL||u.webkitURL,l=document.createElement("a");l.download=a=a||n.name||"download",l.rel="noopener","string"==typeof n?(l.href=n,l.origin===location.origin?m(l):q(l.href)?Z(n,a,p):m(l,l.target="_blank")):(l.href=r.createObjectURL(n),setTimeout(function(){r.revokeObjectURL(l.href)},4e4),setTimeout(function(){m(l)},0))}:"msSaveOrOpenBlob"in navigator?function(n,a,p){if(a=a||n.name||"download","string"!=typeof n)navigator.msSaveOrOpenBlob(function(n,a){return void 0===a?a={autoBom:!1}:"object"!=typeof a&&(console.warn("Deprecated: Expected third argument to be a object"),a={autoBom:!a}),a.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(n.type)?new Blob(["\ufeff",n],{type:n.type}):n}(n,p),a);else if(q(n))Z(n,a,p);else{var r=document.createElement("a");r.href=n,r.target="_blank",setTimeout(function(){m(r)})}}:function(n,a,p,r){if((r=r||open("","_blank"))&&(r.document.title=r.document.body.innerText="downloading..."),"string"==typeof n)return Z(n,a,p);var l="application/octet-stream"===n.type,i=/constructor/i.test(u.HTMLElement)||u.safari,o=/CriOS\/[\d]+/.test(navigator.userAgent);if((o||l&&i||h)&&"undefined"!=typeof FileReader){var t=new FileReader;t.onloadend=function(){var g=t.result;g=o?g:g.replace(/^data:[^;]*;/,"data:attachment/file;"),r?r.location.href=g:location=g,r=null},t.readAsDataURL(n)}else{var s=u.URL||u.webkitURL,d=s.createObjectURL(n);r?r.location=d:location.href=d,r=null,setTimeout(function(){s.revokeObjectURL(d)},4e4)}});u.saveAs=f.saveAs=f,w.exports=f}.apply(_,[]))&&(w.exports=v)},8446:(w,_,c)=>{"use strict";c.r(_),c.d(_,{CvModule:()=>l});var A=c(6019),v=c(212),e=c(3668),Z=c(2473);let q=(()=>{class i{get isFileSaverSupported(){try{return!!new Blob}catch(t){return!1}}genType(t){if(!t||-1===t.lastIndexOf("."))return"text/plain";const s=t.substr(t.lastIndexOf(".")+1);switch(s){case"txt":return"text/plain";case"xml":case"html":return`text/${s}`;case"json":return"octet/stream";default:return`application/${s}`}}save(t,s,d,g){if(!t)throw new Error("Data argument should be a blob instance");const T=new Blob([t],{type:d||t.type||this.genType(s)});(0,Z.saveAs)(T,decodeURI(s||"download"),g)}saveText(t,s,d){const g=new Blob([t]);this.save(g,s,void 0,d)}}return i.\u0275fac=function(t){return new(t||i)},i.\u0275prov=e.Yz7({token:i,factory:i.\u0275fac,providedIn:"root"}),i})(),u=(()=>{class i{}return i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({}),i})();var h=c(4522),f=c(7529);function n(i,o){if(1&i&&(e.TgZ(0,"div",50),e.TgZ(1,"a",51),e._uU(2),e.qZA(),e.TgZ(3,"div",52),e.TgZ(4,"progress",53),e._uU(5),e.qZA(),e.qZA(),e.qZA()),2&i){const t=o.$implicit;e.Q6J("title",t.name+": "+t.rating+"%"),e.xp6(1),e.Q6J("href",t.website,e.LSH),e.xp6(1),e.hij(" ",t.name," "),e.xp6(2),e.Q6J("value",t.rating),e.xp6(1),e.Oqu(t.rating)}}const p=[{path:"",component:(()=>{class i{constructor(t,s){this._fileSaverService=t,this._http=s,this.downloading=!1,this.skills=[{name:"Angular",rating:87,website:"https://angular.io/"},{name:"HTML5",rating:95,website:"https://developer.mozilla.org/en-US/docs/Glossary/HTML5"},{name:"CSS3",rating:75,website:"https://developer.mozilla.org/en-US/docs/Web/CSS"},{name:"Debugging",rating:80,website:"https://www.techopedia.com/definition/16373/debugging"},{name:"Typescript",rating:85,website:"https://www.typescriptlang.org/"},{name:"NgRx",rating:70,website:"https://ngrx.io/"},{name:"RxJs",rating:65,website:"https://rxjs.dev/"},{name:"Javascript",rating:78,website:"https://developer.mozilla.org/en-US/docs/Web/JavaScript"},{name:"GraphQL",rating:83,website:"https://graphql.org/"},{name:"Npm",rating:90,website:"https://www.npmjs.com/"},{name:"Googling",rating:90,website:"https://www.google.com/"},{name:"Version Control",rating:85,website:"https://git-scm.com/"},{name:"Scrum",rating:90,website:"https://www.scrum.org/"},{name:"Linux",rating:70,website:"https://ubuntu.com/"},{name:"NodeJS",rating:60,website:"https://nodejs.org/en/"},{name:"Java",rating:60,website:"https://www.java.com/en/"}]}ngOnInit(){}downloadCV(){this.downloading=!0,this._http.get("assets/media/pdf/cv.pdf",{responseType:"blob"}).subscribe(t=>{var s=new Blob([t],{type:"application/pdf"});this._fileSaverService.save(s,"Albjon_Gjuzi_CV"),this.downloading=!1})}}return i.\u0275fac=function(t){return new(t||i)(e.Y36(q),e.Y36(h.eN))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-cv-wrapper"]],decls:202,vars:140,consts:[[1,"cv"],[1,"cv__left"],[1,"cv__left__section","personal"],[1,"cv__section__title"],[1,"fas","fa-address-card"],["href","mailto:albjon.gjuzi@gmail.com","target","_blank"],["href","tel:+355699688599"],["href","https://www.google.com/maps/place/Durres","target","_blank"],["href","https://www.linkedin.com/in/albjon-gjuzi/","target","_blank"],["href","https://github.com/gjuzialbjon","target","_blank"],[1,"cv__left__section","skills"],[1,"fas","fa-laptop-code"],["class","skill",3,"title",4,"ngFor","ngForOf"],[1,"cv__left__section","languages"],[1,"fas","fa-language"],[1,"cv__right"],[1,"usr-name"],[1,"usr-role"],[1,"fab","fa-angular","mr-2"],[1,"cv__right__section","experience"],[1,"fas","fa-business-time"],[1,"work"],[1,"role-date"],[1,"role"],[1,"date"],["href","https://impaladigital.com/","target","_blank",1,"company"],["src","assets/media/companies/impala.png","width","30px","alt",""],[1,"duties","text-muted"],["href","https://www.upwork.com/","target","_blank",1,"company"],["src","assets/media/companies/upwork.png","width","30px","alt",""],["href","https://www.wearefiber.com/en/","target","_blank",1,"company"],["src","assets/media/companies/fiber.png","width","30px","alt",""],[1,"cv__right__section","studies"],[1,"fas","fa-graduation-cap"],[1,"study"],[1,"dep-date"],["href","https://w3.cs.bilkent.edu.tr/en/","target","_blank",1,"dep"],["href","https://w3.bilkent.edu.tr/bilkent/","target","_blank",1,"school"],["src","assets/media/companies/bilkent.png","width","25px","alt",""],[1,"courses","mt-2","text-muted"],[1,"cv__right__section"],[1,"interests"],[1,"fas","fa-info-circle"],[1,"interests-list"],[1,"soft"],[1,"fas","fa-user"],[1,"soft-skills-list"],[1,"text-center","my-3"],[1,"btn","btn-info","download-cv",3,"disabled","click"],[1,"fas","fa-download"],[1,"skill",3,"title"],["target","_blank",1,"skill__name",3,"href"],[1,"skill__rating"],["max","100",3,"value"]],template:function(t,s){1&t&&(e.TgZ(0,"div",0),e.TgZ(1,"div",1),e.TgZ(2,"div",2),e.TgZ(3,"p",3),e._UZ(4,"i",4),e._uU(5," personal"),e.qZA(),e.TgZ(6,"ul"),e.TgZ(7,"li"),e._uU(8),e.ALo(9,"translate"),e.qZA(),e.TgZ(10,"li"),e.TgZ(11,"a",5),e._uU(12,"gjuzialbjon@gmail.com"),e.qZA(),e.qZA(),e.TgZ(13,"li"),e._uU(14),e.ALo(15,"translate"),e.qZA(),e.TgZ(16,"li"),e.TgZ(17,"a",6),e._uU(18,"+355 69 968 8599"),e.qZA(),e.qZA(),e.TgZ(19,"li"),e._uU(20),e.ALo(21,"translate"),e.qZA(),e.TgZ(22,"li"),e.TgZ(23,"a",7),e._uU(24,"Albania / Durres"),e.qZA(),e.qZA(),e.TgZ(25,"li"),e._uU(26),e.ALo(27,"translate"),e.qZA(),e.TgZ(28,"li"),e.TgZ(29,"a",8),e._uU(30,"linkedin.com/in/albjon-gjuzi"),e.qZA(),e.qZA(),e.TgZ(31,"li"),e._uU(32),e.ALo(33,"translate"),e.qZA(),e.TgZ(34,"li"),e.TgZ(35,"a",9),e._uU(36,"github.com/gjuzialbjon"),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.TgZ(37,"div",10),e.TgZ(38,"p",3),e._UZ(39,"i",11),e._uU(40," skills"),e.qZA(),e.YNc(41,n,6,5,"div",12),e.qZA(),e.TgZ(42,"div",13),e.TgZ(43,"p",3),e._UZ(44,"i",14),e._uU(45),e.ALo(46,"translate"),e.qZA(),e.TgZ(47,"ul"),e.TgZ(48,"li"),e._uU(49),e.ALo(50,"translate"),e.qZA(),e.TgZ(51,"li"),e._uU(52),e.ALo(53,"translate"),e.qZA(),e.TgZ(54,"li"),e._uU(55),e.ALo(56,"translate"),e.qZA(),e.TgZ(57,"li"),e._uU(58),e.ALo(59,"translate"),e.qZA(),e.TgZ(60,"li"),e._uU(61),e.ALo(62,"translate"),e.qZA(),e.TgZ(63,"li"),e._uU(64),e.ALo(65,"translate"),e.qZA(),e.TgZ(66,"li"),e._uU(67),e.ALo(68,"translate"),e.qZA(),e.TgZ(69,"li"),e._uU(70),e.ALo(71,"translate"),e.qZA(),e.TgZ(72,"li"),e._uU(73),e.ALo(74,"translate"),e.qZA(),e.TgZ(75,"li"),e._uU(76),e.ALo(77,"translate"),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.TgZ(78,"div",15),e.TgZ(79,"p",16),e._uU(80,"Albjon Gjuzi"),e.qZA(),e.TgZ(81,"p",17),e._UZ(82,"i",18),e._uU(83),e.ALo(84,"translate"),e.qZA(),e.TgZ(85,"div",19),e.TgZ(86,"p",3),e._UZ(87,"i",20),e._uU(88),e.ALo(89,"translate"),e.qZA(),e.TgZ(90,"div",21),e.TgZ(91,"div",22),e.TgZ(92,"div",23),e._uU(93),e.ALo(94,"translate"),e.qZA(),e.TgZ(95,"div",24),e._uU(96),e.ALo(97,"translate"),e.ALo(98,"translate"),e.qZA(),e.qZA(),e.TgZ(99,"a",25),e._UZ(100,"img",26),e._uU(101,"Impala Digital, Tirana "),e.qZA(),e.TgZ(102,"ul",27),e.TgZ(103,"li"),e._uU(104),e.ALo(105,"translate"),e.qZA(),e.TgZ(106,"li"),e._uU(107),e.ALo(108,"translate"),e.qZA(),e.qZA(),e.qZA(),e.TgZ(109,"div",21),e.TgZ(110,"div",22),e.TgZ(111,"div",23),e._uU(112),e.ALo(113,"translate"),e.qZA(),e.TgZ(114,"div",24),e._uU(115),e.ALo(116,"translate"),e.ALo(117,"translate"),e.qZA(),e.qZA(),e.TgZ(118,"a",28),e._UZ(119,"img",29),e._uU(120,"Upwork, Durres "),e.qZA(),e.TgZ(121,"ul",27),e.TgZ(122,"li"),e._uU(123),e.ALo(124,"translate"),e.qZA(),e.qZA(),e.qZA(),e.TgZ(125,"div",21),e.TgZ(126,"div",22),e.TgZ(127,"div",23),e._uU(128),e.ALo(129,"translate"),e.qZA(),e.TgZ(130,"div",24),e._uU(131),e.ALo(132,"translate"),e.ALo(133,"translate"),e.qZA(),e.qZA(),e.TgZ(134,"a",30),e._UZ(135,"img",31),e._uU(136,"We Are Fiber, Tirana "),e.qZA(),e.TgZ(137,"ul",27),e.TgZ(138,"li"),e._uU(139),e.ALo(140,"translate"),e.qZA(),e.TgZ(141,"li"),e._uU(142),e.ALo(143,"translate"),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.TgZ(144,"div",32),e.TgZ(145,"p",3),e._UZ(146,"i",33),e._uU(147),e.ALo(148,"translate"),e.qZA(),e.TgZ(149,"div",34),e.TgZ(150,"div",35),e.TgZ(151,"a",36),e._uU(152),e.ALo(153,"translate"),e.qZA(),e.TgZ(154,"div",24),e._uU(155),e.ALo(156,"translate"),e.ALo(157,"translate"),e.qZA(),e.qZA(),e.TgZ(158,"a",37),e._UZ(159,"img",38),e._uU(160,"Bilkent University, Ankara, Turkey "),e.qZA(),e.TgZ(161,"p",39),e._uU(162," Algorithms and programming, Application Lifecycle Management, Artificial Intelligence, Automata Theory and Formal Languages, Computer organization Database Systems, Digital design, Fundamental Structures of Computer Science, Operating Systems, Software Engineering Project Management, Software Verification and Validation "),e.qZA(),e.qZA(),e.qZA(),e.TgZ(163,"div",40),e.TgZ(164,"div",41),e.TgZ(165,"p",3),e._UZ(166,"i",42),e._uU(167),e.ALo(168,"translate"),e.qZA(),e.TgZ(169,"ul",43),e.TgZ(170,"li"),e._uU(171),e.ALo(172,"translate"),e.qZA(),e.TgZ(173,"li"),e._uU(174),e.ALo(175,"translate"),e.qZA(),e.TgZ(176,"li"),e._uU(177),e.ALo(178,"translate"),e.qZA(),e.qZA(),e.qZA(),e.TgZ(179,"div",44),e.TgZ(180,"p",3),e._UZ(181,"i",45),e._uU(182),e.ALo(183,"translate"),e.qZA(),e.TgZ(184,"ul",46),e.TgZ(185,"li"),e._uU(186),e.ALo(187,"translate"),e.qZA(),e.TgZ(188,"li"),e._uU(189),e.ALo(190,"translate"),e.qZA(),e.TgZ(191,"li"),e._uU(192),e.ALo(193,"translate"),e.qZA(),e.TgZ(194,"li"),e._uU(195),e.ALo(196,"translate"),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.TgZ(197,"div",47),e.TgZ(198,"button",48),e.NdJ("click",function(){return s.downloadCV()}),e._uU(199),e.ALo(200,"translate"),e._UZ(201,"i",49),e.qZA(),e.qZA(),e.qZA(),e.qZA()),2&t&&(e.xp6(8),e.Oqu(e.lcZ(9,48,"CV.email")),e.xp6(6),e.Oqu(e.lcZ(15,50,"CV.tel")),e.xp6(6),e.Oqu(e.lcZ(21,52,"CV.address")),e.xp6(6),e.Oqu(e.lcZ(27,54,"CV.linkedin")),e.xp6(6),e.Oqu(e.lcZ(33,56,"CV.web")),e.xp6(9),e.Q6J("ngForOf",s.skills),e.xp6(4),e.hij(" ",e.lcZ(46,58,"CV.languages"),""),e.xp6(4),e.Oqu(e.lcZ(50,60,"CV.English")),e.xp6(3),e.Oqu(e.lcZ(53,62,"CV.highly_proficient")),e.xp6(3),e.Oqu(e.lcZ(56,64,"CV.Albanian")),e.xp6(3),e.Oqu(e.lcZ(59,66,"CV.native")),e.xp6(3),e.Oqu(e.lcZ(62,68,"CV.Italian")),e.xp6(3),e.Oqu(e.lcZ(65,70,"CV.working_knowledge")),e.xp6(3),e.Oqu(e.lcZ(68,72,"CV.Spanish")),e.xp6(3),e.Oqu(e.lcZ(71,74,"CV.working_knowledge")),e.xp6(3),e.Oqu(e.lcZ(74,76,"CV.Turkish")),e.xp6(3),e.Oqu(e.lcZ(77,78,"CV.working_knowledge")),e.xp6(7),e.hij(" ",e.lcZ(84,80,"CV.frontend"),""),e.xp6(5),e.hij(" ",e.lcZ(89,82,"CV.work_experience"),""),e.xp6(5),e.Oqu(e.lcZ(94,84,"CV.frontend")),e.xp6(3),e.AsE("",e.lcZ(97,86,"Months.2")," 2021 - ",e.lcZ(98,88,"CV.present"),""),e.xp6(8),e.Oqu(e.lcZ(105,90,"Work.bring")),e.xp6(3),e.Oqu(e.lcZ(108,92,"Work.expand")),e.xp6(5),e.Oqu(e.lcZ(113,94,"Work.software")),e.xp6(3),e.AsE("",e.lcZ(116,96,"Months.9")," 2020 - ",e.lcZ(117,98,"CV.present"),""),e.xp6(8),e.Oqu(e.lcZ(124,100,"Work.freelance")),e.xp6(5),e.Oqu(e.lcZ(129,102,"CV.frontend")),e.xp6(3),e.AsE("",e.lcZ(132,104,"Months.1")," 2020 - ",e.lcZ(133,106,"Months.7")," 2021"),e.xp6(8),e.Oqu(e.lcZ(140,108,"Work.design")),e.xp6(3),e.Oqu(e.lcZ(143,110,"Work.work")),e.xp6(5),e.hij(" ",e.lcZ(148,112,"CV.studies"),""),e.xp6(5),e.Oqu(e.lcZ(153,114,"CV.bachelor")),e.xp6(3),e.AsE("",e.lcZ(156,116,"Months.8")," 2015 - ",e.lcZ(157,118,"Months.8")," 2019"),e.xp6(12),e.hij(" ",e.lcZ(168,120,"CV.interests"),""),e.xp6(4),e.Oqu(e.lcZ(172,122,"CV.sports")),e.xp6(3),e.Oqu(e.lcZ(175,124,"CV.music")),e.xp6(3),e.Oqu(e.lcZ(178,126,"CV.memes")),e.xp6(5),e.hij(" ",e.lcZ(183,128,"CV.soft_skills"),""),e.xp6(4),e.Oqu(e.lcZ(187,130,"CV.communication")),e.xp6(3),e.Oqu(e.lcZ(190,132,"CV.patience")),e.xp6(3),e.Oqu(e.lcZ(193,134,"CV.critical")),e.xp6(3),e.Oqu(e.lcZ(196,136,"CV.teamwork")),e.xp6(3),e.Q6J("disabled",s.downloading),e.xp6(1),e.hij(" ",s.downloading?"CV.downloading":e.lcZ(200,138,"CV.download")," "))},directives:[A.sg],pipes:[f.X$],encapsulation:2}),i})()}];let r=(()=>{class i{}return i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[[v.Bz.forChild(p)],v.Bz]}),i})(),l=(()=>{class i{}return i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[[A.ez,r,u,h.JF,f.aw.forChild()]]}),i})()}}]);