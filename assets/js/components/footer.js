// FOOTER
Vue.component('my-footer', {
   // template
   template:
      `
         <div class="footer">
            <div class="container">
            
               <div class="footer__pagination">
                  <button class="button" @click="prev_page()" :disabled="is_prev_disabled">
                     <img src="./assets/images/previous.png">
                     <small>Prev</small>
                  </button>
                  <button class="button" @click="next_page()" :disabled="is_next_disabled" >
                     <small>Next</small>
                     <img src="./assets/images/next.png">
                  </button>
               </div>

               <div class="footer__action">
                  <button class="button button-cancel" @click="reset_page()">
                     <small>Cancel</small>
                  </button>
                  <button class="button button-save" @click="save_product()">
                     <small>Save</small>
                  </button>
               </div>

            </div>
         </div>
      `,


   // data
   data() {
		return {
         button_hidden: 'button_hidden',
         is_prev_disabled: true,
         is_next_disabled: false,
		}
   },

   // props
   props: {
      prev_page : { type: Function },
      next_page : { type: Function },
      selected_product_list: { type: Array },
      current_page: { type: Number },
      num_pages: { type: Function }
   },

   // medthods
   methods: {
      save_product() {
         let product_store = localStorage.getItem("product_store") ? localStorage.getItem("product_store") : '[]';
         product_store = JSON.parse(product_store);
         product_store = [...this.selected_product_list];
         localStorage.setItem('product_store', JSON.stringify(product_store))
      },

      reset_page(){
         localStorage.clear();
         location.reload();
      }
   },

   // Watch
   watch: {
      current_page() {
         if(this.current_page == 1 ) {
            this.is_prev_disabled = true;
         } 
         if (this.current_page == this.num_pages()) {
            this.is_next_disabled = true;
         } 
         if(this.current_page != 1) {
            this.is_prev_disabled = false;
         }
         if (this.current_page != this.num_pages()) {
            this.is_next_disabled = false;
         }
      }
   }

});
