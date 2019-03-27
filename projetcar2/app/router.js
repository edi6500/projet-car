import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('home', function() {
    this.route('accueil');
    this.route('changepassword');
    this.route('confirm');
    this.route('contact');
    this.route('devis');
    this.route('services');
    this.route('inscription');
  });
  this.route('tokenauth', {path: 'tokenauth/:token'});
  this.route('login');
  this.route('back-client', function() {
    this.route('client', {path: ':id'}, function() {
      this.route('client-devis');
      this.route('client-profil');
      this.route('edit-devis');
      this.route('info-devis', {path : 'info-devis/:idquote'});
      this.route('overview');
      this.route('update-profil');
    });
  });
  this.route('back-agent', function() {
    this.route('agent', {path: ':id'}, function() {
      this.route('devis-attente');
      this.route('devi-traiter');
      this.route('devi-finish');
      this.route('devi-detail', {path : 'devi-detail/:idquote'});
      this.route('devi-create', {path : 'devi-create/:idquote'});
    });
  });
});

export default Router;
