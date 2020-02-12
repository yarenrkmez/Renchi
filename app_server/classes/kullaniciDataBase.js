var Db = require("../models/kullaniciSchema");
var mekanDb = require("../models/mekanSchema");
var session = require("express-session");
var uniqid = require("uniqid");
var musteriDataBase = require('../classes/mekanDataBase');
var Kodkontrol = require('../models/kodKontrolSchema');

class DataBaseKullanici {
  constructor(name, surname, username, email, password) {
    this.name = name;
    this.surname = surname;
    this.username = username;
    this.email = email;
    this.password = password;
  }
  kaydet(req, res) {
    console.log("email:" + this.email);
    Db.findOne().where('email').equals(this.email).then(user => {
      if (user == null) {
        Db.findOne().where('username').equals(this.username).then(user1 => {
          if(user1==null){
            var userSave = new Db({
              name: this.name,
              surname: this.surname,
              username: this.username,
              email: this.email,
              password: this.password,
              puan: 0,
              kod: "A"
            });
            userSave.save(function (error) {
              if (error) {
                console.log("kayıt olamadi" + error);
              }
            });
            var kontrol = new Kodkontrol({
              username: this.username,
              kullanilanKod: []
            })
            kontrol.save(function (error) {
              if (error) {
                console.log("kayıt olamadi" + error);
              }
            })
            res.render('index', { error: undefined });
          }
          else{
            var msg = "Username başka kullanıcı tarafından kullanılmıştır";
            res.render('register', { error: msg })
          }
        })

      }
      else {
        var msg = "Email başka kullanıcı tarafından kullanılmıştır";
        res.render('register', { error: msg })
      }
    })
  }
  login_filter(req, res) {
    Db.findOne({ password: this.password, email: this.email }).then(user => {
      if (user) {
        console.log("Kullanicivar");
        req.session.User = user;
        res.render("kullanici", { user: req.session.User });
      } else {
        console.log("kullanici yok");
        var msg = "hatali giris";
        res.render("index", {
          error: msg
        });
      }
    });
  }
  mekanAra(req, res) {
    mekanDb.findOne({ name: req.body.mekanAdi }).then(mekan => {
      if (mekan) {
        console.log("mekan bulundu");
        req.session.User.kod = mekan.mekanKodu;
        res.render("mekanProfil", { name: mekan.name, address: mekan.adres, img1: mekan.pic1, img2: mekan.pic2, img3: mekan.pic3, error: undefined, puan: mekan.puan });
      }
      else {
        console.log("mekan yok");
        var msg = "Aranan bulunamadi";
        res.render("mekanlar", { error: msg });
      }

    })
  }
  yonleMekan(req, res) {
    mekanDb.findOne({ name: req.body.mekanYonlen }).then(mekan => {
      req.session.User.kod = mekan.mekanKodu;
      if (mekan) {
        console.log("mekan bulundu");
        console.log(req.body.mekanYonlen)
        res.render('mekanProfil', {
          name: mekan.name,
          address: mekan.adres,
          img1: mekan.pic1,
          img2: mekan.pic2,
          img3: mekan.pic3,
          puan: mekan.puan,
          error: undefined
        });
      } else {
        console.log("mekan yok");
        var msg = "Aranan bulunamadi";
        res.render("mekanlar", { error: msg });
      }
    });
  }
  puanKazan(req, res) {
    console.log(req.session.User.kod + "-> Mekan Kodu");
    mekanDb.findOne({}).where('mekanKodu').equals(req.session.User.kod).then(mekan => {
      if (req.body.mekanKoduP == req.session.User.kod) {
        Kodkontrol.findOne({ kullanilanKod: req.session.User.kod }).where('username').equals(this.username).then(kontrol => {
          if (kontrol == null) {
            res.render('mekanProfil', { name: mekan.name, address: mekan.adres, img1: mekan.pic1, img2: mekan.pic2, img3: mekan.pic3, error: undefined, puan: mekan.puan });
            Kodkontrol.update({ username: this.username }, { $push: { kullanilanKod: req.session.User.kod } }).where('username').equals(this.username).then(user => {
              console.log(user.username);
              user.kullanilanKod = req.session.User.kod;
              user.save(function (error) {
                if (error) {
                  console.log("kayıt olamadi" + error);
                }
              })
            })
            Db.findOneAndUpdate({}).where('username').equals(this.username).then(user => {
              var k_Puan = user.puan;
              k_Puan = k_Puan + 5;
              user.puan = k_Puan;
              req.session.User.puan = k_Puan;
              user.save();
            })
            var pGuncelle = new musteriDataBase();
            pGuncelle.puanGuncelle(req, res);
          } else {
            const msg = 'Mekan Kodu Uyuşmadı veya kodu kullandınız'
            console.log("hata");
            res.render('mekanProfil', { name: mekan.name, address: mekan.adres, img1: mekan.pic1, img2: mekan.pic2, img3: mekan.pic3, error: msg, puan: mekan.puan });
          }
        })
      }
      else {
        const msg = 'Mekan Kodu Uyuşmadı veya kodu kullandınız'
        console.log("hata");
        res.render('mekanProfil', { name: mekan.name, address: mekan.adres, img1: mekan.pic1, img2: mekan.pic2, img3: mekan.pic3, error: msg, puan: mekan.puan });
      }
    })
  }
}
//class ı diğer sayfalarda kullnamak için
module.exports = DataBaseKullanici;
