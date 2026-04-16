var express = require ('express');
var router = express.Router();
const userController = require('../module/user/userController');
const upload = require('../middlewares/multer');

// Rota para a pagina inicial
router.get('/',function(req, res, next){
  res.render('index',{title: 'Videos Curtos e Enganjadores'});
});

// Rota para exibir o feed de vídeos (protegida por autenticação)
router.get('/feed', authMiddleware, async (req, res) => {
    const user = await userController.getProfile(req.session.user.id);
    res.render('home', { user });
});

// Rota para exibir o formulario de cadastro
router.get('/register', (req, res)=> {
  res.render('register', {title: 'Criar conta'});
});

// Rota que processa o formulario de cadastro
router.post('/register',userController.register);

// Rota para exibir o formulario de login
router.get('/login', (req, res)=> {
  res.render('login',{title: 'Entrar' });
});

// Rota para exibir o perfil do usuário (protegida por autenticação)
router.get('/profile/edit', authMiddleware, async (req, res) => {
    const user = await userController.getProfile(req.session.user.id);
    res.render('edit-profile', { user });
});

// Rota de atualização (Protegida + Upload de 1 arquivo chamado 'profilePicture')
router.post('/profile/edit', authMiddleware, upload.single('profilePicture'), userController.updateProfile);

module.exports = router;