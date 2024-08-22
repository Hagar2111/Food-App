"use strict";(self.webpackChunkfood_app=self.webpackChunkfood_app||[]).push([[69],{6069:(Y,u,i)=>{i.r(u),i.d(u,{UsersModule:()=>F});var g=i(6814),h=i(3403),f=i(5061),c=i(7700),e=i(5879);let Z=(()=>{class a{constructor(t,o){this.dialogRef=t,this.data=o,this.baseUrl="https://upskilling-egypt.com:3006/",this.emptyImg="../../../assets/imgs/emptyUser.png"}onNoClick(){this.dialogRef.close()}static#e=this.\u0275fac=function(o){return new(o||a)(e.Y36(c.so),e.Y36(c.WI))};static#t=this.\u0275cmp=e.Xpm({type:a,selectors:[["app-view-user"]],decls:18,vars:4,consts:[[1,"p-4"],[1,"container"],[1,"row","justify-content-between"],[1,"col-md-4"],["alt","",1,"w-100",3,"src"],[1,"col-md-8","d-flex","flex-column","justify-content-center"],[1,"mt-3"],[1,"fa-solid","fa-envelope"],[1,"fa-solid","fa-phone"],[1,"col-md-12","text-end","my-2"],[1,"btn","btn-secondary",3,"click"]],template:function(o,n){1&o&&(e.TgZ(0,"section",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div"),e._UZ(5,"img",4),e.qZA()(),e.TgZ(6,"div",5)(7,"h2"),e._uU(8),e.qZA(),e.TgZ(9,"p",6),e._UZ(10,"i",7),e._uU(11),e.qZA(),e.TgZ(12,"p"),e._UZ(13,"i",8),e._uU(14),e.qZA()(),e.TgZ(15,"div",9)(16,"button",10),e.NdJ("click",function(){return n.onNoClick()}),e._uU(17,"Close"),e.qZA()()()()()),2&o&&(e.xp6(5),e.Q6J("src",n.data.imagePath?n.baseUrl+n.data.imagePath:n.emptyImg,e.LSH),e.xp6(3),e.Oqu(n.data.userName),e.xp6(3),e.hij(" ",n.data.email,""),e.xp6(3),e.hij(" ",n.data.phoneNumber,""))},styles:["section[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{color:#4aa35a;font-size:1.2rem}"]})}return a})();var U=i(9862);let _=(()=>{class a{constructor(t){this._HttpClient=t}getAllUsers(t){return this._HttpClient.get("Users",{params:t})}getUserById(t){return this._HttpClient.get(`Users/${t}`)}onDeleteUser(t){return this._HttpClient.delete(`User/${t}`)}static#e=this.\u0275fac=function(o){return new(o||a)(e.LFG(U.eN))};static#t=this.\u0275prov=e.Yz7({token:a,factory:a.\u0275fac,providedIn:"root"})}return a})();var v=i(3646),T=i(8874),C=i(2425),d=i(6311),y=i(617),A=i(2296),x=i(2032),m=i(9157),b=i(3365),M=i(4913),O=i(3680),p=i(6223);function q(a,l){if(1&a){const t=e.EpF();e.TgZ(0,"button",28),e.NdJ("click",function(){e.CHM(t);const n=e.oxw();return n.searchValue="",e.KtG(n.getUsersData())}),e.TgZ(1,"mat-icon"),e._uU(2,"close"),e.qZA()()}}function D(a,l){if(1&a&&(e.TgZ(0,"mat-option",29),e._uU(1),e.qZA()),2&a){const t=l.$implicit;e.Q6J("value",t.id),e.xp6(1),e.Oqu(t.name)}}function N(a,l){if(1&a){const t=e.EpF();e.TgZ(0,"tr")(1,"td"),e._uU(2),e.qZA(),e.TgZ(3,"td"),e._UZ(4,"img",31),e.qZA(),e.TgZ(5,"td"),e._uU(6),e.qZA(),e.TgZ(7,"td"),e._uU(8),e.qZA(),e.TgZ(9,"td"),e._uU(10),e.qZA(),e.TgZ(11,"td"),e._uU(12),e.qZA(),e.TgZ(13,"td")(14,"button",32)(15,"mat-icon"),e._uU(16,"more_vert"),e.qZA()(),e.TgZ(17,"mat-menu",null,33)(19,"button",34),e.NdJ("click",function(){const s=e.CHM(t).$implicit,r=e.oxw(2);return e.KtG(r.openViewUserDialog(s))}),e.TgZ(20,"mat-icon"),e._uU(21,"visibility"),e.qZA(),e.TgZ(22,"span"),e._uU(23,"View"),e.qZA()(),e.TgZ(24,"button",34),e.NdJ("click",function(){const s=e.CHM(t).$implicit,r=e.oxw(2);return e.KtG(r.openDeleteDialog(s.id))}),e.TgZ(25,"mat-icon"),e._uU(26,"delete"),e.qZA(),e.TgZ(27,"span"),e._uU(28,"Delete"),e.qZA()()()()()}if(2&a){const t=l.$implicit,o=e.MAs(18),n=e.oxw(2);e.xp6(2),e.Oqu(t.userName),e.xp6(2),e.Q6J("src",t.imagePath?n.baseUrl+t.imagePath:n.emptyImg,e.LSH),e.xp6(2),e.Oqu(t.email),e.xp6(2),e.Oqu(t.phoneNumber),e.xp6(2),e.Oqu(t.country),e.xp6(2),e.Oqu(t.group.name),e.xp6(2),e.Q6J("matMenuTriggerFor",o)}}function S(a,l){if(1&a&&(e.TgZ(0,"tbody"),e.YNc(1,N,29,7,"tr",30),e.qZA()),2&a){const t=e.oxw();e.xp6(1),e.Q6J("ngForOf",t.listData.data)}}function I(a,l){1&a&&(e.TgZ(0,"div",35)(1,"div"),e._UZ(2,"img",36),e.qZA(),e.TgZ(3,"h3",37),e._uU(4,"No Data !"),e.qZA(),e.TgZ(5,"p",38),e._uU(6,"Unfortunatily, no data found. "),e.qZA()())}const J=function(){return[5,10,25,100]},P=[{path:"",component:(()=>{class a{constructor(t,o,n,s,r){this._UsersService=t,this._CategoriesService=o,this._RecipesService=n,this._ToastrService=s,this.dialog=r,this.baseUrl="https://upskilling-egypt.com:3006/",this.emptyImg="../../../assets/imgs/emptyUser.png",this.pageSize=10,this.pageNumber=1,this.categoryItem="",this.listTags=[],this.listCategories=[],this.searchValue="",this.parameterKey="",this.roleIds=[],this.categoryId=0,this.noDataFound=!1,this.getUsersData()}getUsersData(){this._UsersService.getAllUsers({[this.parameterKey]:this.searchValue,groups:this.roleIds,pageSize:this.pageSize,pageNumber:this.pageNumber}).subscribe({next:o=>{this.listData=o,0==this.listData.totalNumberOfRecords?(this.noDataFound=!0,console.log("empty")):this.noDataFound=!1},error:o=>this._ToastrService.error(o.error.message,"Error"),complete:()=>this._ToastrService.success("Users were successfully retrieved.","Success")})}openViewUserDialog(t){this.dialog.open(Z,{data:t}).afterClosed().subscribe(n=>{console.log("The dialog was closed"),console.log(n),n&&this.onDeleteItem(n)})}openDeleteDialog(t){this.dialog.open(f.T,{data:{itemId:t}}).afterClosed().subscribe(n=>{console.log("The dialog was closed"),console.log(n),n&&this.onDeleteItem(n)})}onDeleteItem(t){this._UsersService.onDeleteUser(t).subscribe({next:o=>{console.log(o)},error:o=>this._ToastrService.error(o.error.message,"Error"),complete:()=>this._ToastrService.success("The item deleted successfully.")})}handlePageEvent(t){this.pageSize=t.pageSize,this.pageNumber=t.pageIndex,this.getUsersData()}static#e=this.\u0275fac=function(o){return new(o||a)(e.Y36(_),e.Y36(v.G),e.Y36(T.v),e.Y36(C._W),e.Y36(c.uw))};static#t=this.\u0275cmp=e.Xpm({type:a,selectors:[["app-users"]],decls:73,vars:12,consts:[[1,"top-section","p-4","mt-3"],[1,"row","align-items-center"],[1,"col-md-8"],[1,"col-md-4","text-end"],[1,"d-flex","justify-content-center"],["src","../../../assets/imgs/menu-avatar.svg","alt","",1,"w-75"],[1,"my-3"],[1,"h4"],[1,"container"],[1,"row"],[1,"col-md-6"],["appearance","outline",1,"w-100"],["matInput","","type","text",3,"ngModel","ngModelChange","keyup.enter"],["matSuffix","","mat-icon-button","","aria-label","Clear",3,"click",4,"ngIf"],[1,"col-md-3"],["multiple","",3,"ngModel","ngModelChange","selectionChange"],["value","0"],["value","1"],["value","2"],[3,"value",4,"ngFor","ngForOf"],["value","userName"],["value","email"],["value","country"],[1,"table","table-striped"],[4,"ngIf"],["class","mt-4 text-center d-flex flex-column align-items-center",4,"ngIf"],["aria-label","Select page",1,"demo-paginator",3,"length","pageSize","pageIndex","pageSizeOptions","page"],["paginator",""],["matSuffix","","mat-icon-button","","aria-label","Clear",3,"click"],[3,"value"],[4,"ngFor","ngForOf"],["alt","",1,"",3,"src"],["mat-icon-button","","aria-label","Example icon-button with a menu",3,"matMenuTriggerFor"],["menu","matMenu"],["mat-menu-item","",3,"click"],[1,"mt-4","text-center","d-flex","flex-column","align-items-center"],["width","250px","src","../../../assets/imgs/delete-img.svg","alt","no data"],[1,"mt-3"],[1,"mt-2","text-muted"]],template:function(o,n){1&o&&(e.TgZ(0,"section",0)(1,"div",1)(2,"div",2)(3,"div")(4,"h1"),e._uU(5,"Users "),e.TgZ(6,"span"),e._uU(7,"List"),e.qZA()(),e.TgZ(8,"p"),e._uU(9,"You can now add your items that any user can order it from the Application and you can edit"),e.qZA()()(),e.TgZ(10,"div",3)(11,"div",4),e._UZ(12,"img",5),e.qZA()()()(),e.TgZ(13,"section")(14,"div")(15,"div",6)(16,"h2",7),e._uU(17,"Users Table Details"),e.qZA(),e.TgZ(18,"p"),e._uU(19,"You can check all datails"),e.qZA()(),e.TgZ(20,"div")(21,"div",8)(22,"div",9)(23,"div",10)(24,"mat-form-field",11)(25,"mat-label"),e._uU(26,"Search Users"),e.qZA(),e.TgZ(27,"input",12),e.NdJ("ngModelChange",function(r){return n.searchValue=r})("keyup.enter",function(){return n.getUsersData()}),e.qZA(),e.YNc(28,q,3,0,"button",13),e.qZA()(),e.TgZ(29,"div",14)(30,"mat-form-field",11)(31,"mat-label"),e._uU(32,"Role"),e.qZA(),e.TgZ(33,"mat-select",15),e.NdJ("ngModelChange",function(r){return n.roleIds=r})("selectionChange",function(){return n.getUsersData()}),e.TgZ(34,"mat-option",16),e._uU(35,"All "),e.qZA(),e.TgZ(36,"mat-option",17),e._uU(37,"Admin "),e.qZA(),e.TgZ(38,"mat-option",18),e._uU(39,"User "),e.qZA(),e.YNc(40,D,2,2,"mat-option",19),e.qZA()()(),e.TgZ(41,"div",14)(42,"mat-form-field",11)(43,"mat-label"),e._uU(44,"Search By"),e.qZA(),e.TgZ(45,"mat-select",15),e.NdJ("ngModelChange",function(r){return n.parameterKey=r})("selectionChange",function(){return n.getUsersData()}),e.TgZ(46,"mat-option",20),e._uU(47,"Name "),e.qZA(),e.TgZ(48,"mat-option",21),e._uU(49,"Email "),e.qZA(),e.TgZ(50,"mat-option",22),e._uU(51,"Country "),e.qZA()()()()()(),e.TgZ(52,"table",23)(53,"thead")(54,"th"),e._uU(55,"Name"),e.qZA(),e.TgZ(56,"th"),e._uU(57,"Image"),e.qZA(),e.TgZ(58,"th"),e._uU(59,"email"),e.qZA(),e.TgZ(60,"th"),e._uU(61,"phoneNumber"),e.qZA(),e.TgZ(62,"th"),e._uU(63,"country"),e.qZA(),e.TgZ(64,"th"),e._uU(65,"role"),e.qZA(),e.TgZ(66,"th"),e._uU(67,"Action"),e.qZA()(),e.YNc(68,S,2,1,"tbody",24),e.qZA(),e.YNc(69,I,7,0,"div",25),e.TgZ(70,"div",4)(71,"mat-paginator",26,27),e.NdJ("page",function(r){return n.handlePageEvent(r)}),e.qZA()()()()()),2&o&&(e.xp6(27),e.Q6J("ngModel",n.searchValue),e.xp6(1),e.Q6J("ngIf",n.searchValue),e.xp6(5),e.Q6J("ngModel",n.roleIds),e.xp6(7),e.Q6J("ngForOf",n.listTags),e.xp6(5),e.Q6J("ngModel",n.parameterKey),e.xp6(23),e.Q6J("ngIf",n.listData.data.length>0),e.xp6(1),e.Q6J("ngIf",n.noDataFound),e.xp6(2),e.Q6J("length",null==n.listData?null:n.listData.totalNumberOfRecords)("pageSize",n.pageSize)("pageIndex",n.pageNumber)("pageSizeOptions",e.DdM(11,J)))},dependencies:[g.sg,g.O5,d.VK,d.OP,d.p6,y.Hw,A.RK,x.Nt,m.KE,m.hX,m.R9,b.NW,M.gD,O.ey,p.Fj,p.JJ,p.On],styles:[".top-section[_ngcontent-%COMP%]{background-image:url(header-bg.e7cd2c7a9e952177.svg);background-color:#009247;background-size:cover;background-repeat:no-repeat;background-position:center center;border-radius:10px;color:#fff}@media (max-width: 576px){.top-section[_ngcontent-%COMP%]{padding-top:2rem;padding-left:1rem;padding-right:1rem;font-size:1.2rem}}@media (min-width: 577px) and (max-width: 992px){.top-section[_ngcontent-%COMP%]{padding-top:var(--medium-screen-padding-top);padding-left:var(--medium-screen-padding-left-right);padding-right:var(--medium-screen-padding-left-right);font-size:var(--medium-screen-font-size)}}@media (min-width: 993px) and (max-width: 1200px){.top-section[_ngcontent-%COMP%]{padding-top:var(--large-screen-padding-top);padding-left:var(--large-screen-padding-left-right);padding-right:var(--large-screen-padding-left-right);font-size:var(--large-screen-font-size)}}@media (min-width: 1201px){.top-section[_ngcontent-%COMP%]{padding-top:var(--extra-large-screen-padding-to) p;padding-left:var(--extra-large-screen-padding-left) -right;padding-right:var(--extra-large-screen-padding-left) -right;font-size:var(--extra-large-screen-font) -size}}.imgBx[_ngcontent-%COMP%]{width:-moz-fit-content;width:fit-content}@media (min-width: 450px){.imgBx[_ngcontent-%COMP%]   .imgBx[_ngcontent-%COMP%]{transform:translateY(28px)}}section[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]{height:5.5rem;line-height:5}section[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:2rem}"]})}return a})()}];let w=(()=>{class a{static#e=this.\u0275fac=function(o){return new(o||a)};static#t=this.\u0275mod=e.oAB({type:a});static#n=this.\u0275inj=e.cJS({imports:[h.Bz.forChild(P),h.Bz]})}return a})();var z=i(555);let F=(()=>{class a{static#e=this.\u0275fac=function(o){return new(o||a)};static#t=this.\u0275mod=e.oAB({type:a});static#n=this.\u0275inj=e.cJS({imports:[g.ez,w,z.m]})}return a})()}}]);