
(function(){


    let init = function(){
        vueApply();
    };

    let vueApply = function(){
        console.log("vueApply");

        let faqs = [
            {title: '1. 我在活動期間才入職可以參加抽獎嗎？', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt adipisci delectus reiciendis! Veniam quo sunt quam quod ratione dolore! Quod tempore provident vitae magni reprehenderit numquam incidunt ipsa libero ipsam!'},
            {title: '2. 我在活動期間才入職可以參加抽獎嗎？', text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia at quibusdam, repudiandae molestias optio saepe ex nobis impedit, vero doloribus illum. Perspiciatis porro molestias facilis sunt? Excepturi dolorum sed enim.'},
            {title: '3. 我在活動期間才入職可以參加抽獎嗎？', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus sint ullam labore? Non, expedita ratione nobis veniam, optio mollitia eum enim deserunt, rerum culpa ipsam totam? Fuga voluptate quod cumque.'},
        ]
         
        new Vue({
            el: '#app',
            data: {
                scrollPosition: null,
                isActive: false,
                tab: 'date4',
                faqs: faqs,
                currentFaq: 0
      
            },
            computed: {
          

            },
            methods: {
                getHeaderClass (){
                    if(this.scrollPosition > 0){
                        return{
                            headerClass: true
                        }
                    }
                    return {
                        headerClass: false
                    }
                },
                updateScroll() {
                    this.scrollPosition = window.scrollY;
                    console.log("this.scrollPosition", this.scrollPosition);
                },
                scrollToDate(){
                    let top = this.$refs.header.clientHeight;
                    VueScrollTo.setDefaults({
                        duration: 500,
                        offset: - (top + 12) ,
                    })  
                },
                getDateClass(tab){

                    if(tab == this.tab){
                        return {
                            active: true
                        };
                    }
    
                    return {
                        active: false
                    };
                },
                dateClick(tab){
                    this.tab = tab;
                },
                open(index){
                    this.currentFaq = index;
                }
            },
            mounted(){
                window.addEventListener('scroll', this.updateScroll);
                window.addEventListener('scroll', this.scrollToDate);
                window.addEventListener('load', this.updateScroll);
                window.addEventListener('load', this.scrollToDate);
            },
            destroy() {
                window.removeEventListener('scroll', this.updateScroll);
                window.removeEventListener('scroll', this.scrollToDate);
            },
            watch:{
                // scrollPosition: function(){
                //     this.scrollToDate();
                // }
            }
          });

 


    }



    init();
})();
