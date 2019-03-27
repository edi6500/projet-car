import Component from '@ember/component';

export default Component.extend({
  route : "",
  isOpen: false,
  onClick(){},
    actions: {
      toggleMenu(){
        if (this.isOpen === false){
          this.set('isOpen', true);
          // console.log('true')
        }
         else{
          this.set('isOpen', false);
        }
      },
      logout(event) {
        this.onClick(event);
      }
    }
});