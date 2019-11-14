//1.ѡ�������

//2.ѡ���ɾ��
//3.ѡ���˫���Ķ�
(function(window){
	var that;
	var n = 4;
	function MyCard(option){
		this._init(option);
	};
	MyCard.prototype = {
		constructor:MyCard,
		_init: function(option){
			this.el = option.el;
			this.scopeFunc();
			this.bindevent();
		},
		scopeFunc: function(){    //��ʼ�����Լ�����ȫ�ֱ���
			that = this;
			this.wrapNode = document.querySelector(this.el);
			this.divNode = this.wrapNode.querySelector('#content');
			this.ulNode = this.wrapNode.querySelector('#header>ul');
		},
		update:function(){
			this.liNodes = this.wrapNode.querySelectorAll('li');
			this.spans = this.wrapNode.querySelectorAll('li>span');
			this.spanNode = this.wrapNode.querySelector("#header>#add>span");
			this.arts = this.wrapNode.querySelectorAll("#content>article");
		},
				//4.ѡ���ͬ���л��Լ�ɾ��
		toggleAndRemove: function () {
			this.update();
			this.bindevent();
		},
		//1.ѡ�������
		tabAdd: function(){
			that.update();
			if(that.liNodes.length === 7)return;//tab��length==7ʱonclickʧЧ
			var lihtml = "<li class='on'><span class='remove-icon'>Tabcard0"+ n+"</span></li>";
			var arthtml = "<article class='ar-on'>Article0"+ n +"</article>";
			that.clearclass()
			that.ulNode.innerHTML += lihtml;
			that.divNode.innerHTML += arthtml;
			n++;
			that.bindevent();	
		},
		bindevent:function(){
			this.update();
			this.spanNode.onclick = that.tabAdd;
			for(let i=0;i<that.spans.length;i++){
				that.spans[i].addEventListener('dblclick', that.tabEdit)};
			for(let i=0;i<that.arts.length;i++){
				that.arts[i].addEventListener('dblclick', that.tabEdit)};
			for(let i=0;i<that.liNodes.length;i++){
				that.liNodes[i].ind = i;	
				that.liNodes[i].addEventListener('click',  function(event){
					if(event.target.nodeName ==="SPAN"){
							that.clearclass();
							this.className = 'on';
							that.arts[this.ind].className = "ar-on";
						}
					// else if(event.target.nodeName ==="TEXEAREA")return;
					else{
						if(((this.ind+1) ===that.liNodes.length)&&(this.className === 'on')&&(this.ind > 0)){
							that.liNodes[this.ind-1].className = 'on';
							that.arts[this.ind-1].className = "ar-on";
						}
						console.log(this);
						this.parentNode.removeChild(this);
						that.arts[this.ind].parentNode.removeChild(that.arts[this.ind]);
					};	
					that.update();
		})
			}
		},
		clearclass :function(){
			for(let j=0;j<that.liNodes.length;j++){
				that.liNodes[j].className= '';
				that.arts[j].className = "";}
		},
		//3.ѡ���˫���Ķ�
		tabEdit: function(){
			that.update();
			var stext = "<textarea  style='width: 80%;height:80%;font-size: 16px;resize:none;' >"+ this.innerText+"</textarea>";
			var atext = '<textarea  style="width: 80%;height:80%;font-size: 16px;resize:none;" >'+ this.innerText+'</textarea>';
			if(this.nodeName==="SPAN"){
				
				this.insertAdjacentHTML("beforebegin",stext);
				this.parentNode.removeChild(this);
				
			}else{
				this.insertAdjacentHTML("beforebegin",atext);
				this.parentNode.removeChild(this);
			}
				return false;
		}
		
	}
	//����
new MyCard({
			el:'#wrap'
		})
}(window))