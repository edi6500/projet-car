import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    async toDevis(){
      await this.transitionToRoute('home.devis');
    }
  }
});
