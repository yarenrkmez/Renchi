var Db = require('../models/mekanSchema');
var uniqid = require('uniqid')
var session = require('express-session');
var kullanici = require('../models/kullaniciSchema');

class musteriDataBase {
    constructor(name, adres, username, email, pic1, pic2, pic3, password) {
        this.name = name;
        this.adres = adres;
        this.username = username;
        this.email = email;
        this.pic1 = pic1;
        this.pic2 = pic2;
        this.pic3 = pic3;
        this.password = password;
    }
    mekanKaydet() {
        var mekanSave = new Db({
            name: this.name,
            adres: this.adres,
            username: this.username,
            email: this.email,
            pic1: this.pic1,
            pic2: this.pic2,
            pic3: this.pic3,
            password: this.password,
            mekanKodu: uniqid(),
            puan: 1,
            puanVerenSayisi: 0
        })
        mekanSave.save((error) => {
            if (!error) {
                console.log("kaydedildi");
            }
            else {
                console.log("hatali" + error);
            }
        })
    }
    loginMekan(req, res) {
        Db.findOne({ password: this.password, email: this.email })
            .then(mekan => {
                console.log(mekan);
                if (mekan) {
                    console.log("mekan var");
                    req.session.Mekan = mekan;
                    console.log(req.session.Mekan.username)
                    res.render('isletmeSahibi', { mekan: req.session.Mekan, msg: undefined });
                }
                else {
                    console.log("mekan yok");
                    var msg = 'hatali giris';
                    res.render('index', {
                        error: msg
                    });
                }
            })
    }
    kodGuncelleme(req, res) {
        Db.findOneAndUpdate().where('username').equals(this.username).then(mekan => {
            mekan.mekanKodu = uniqid();
            mekan.save(function (error) {
                if (!error) {
                    console.log("kaydedildi");
                    req.session.Mekan.mekanKodu = mekan.mekanKodu;
                    res.redirect('isletmeSahibi')
                    res.render('isletmeSahibi', { mekan: req.session.Mekan, msg: undefined });
                }
                else {
                    console.log("hatali" + error);
                }
            })
        })
    }
    resimGuncelleme(req, res) {
        Db.findOneAndUpdate().where('username').equals(this.username).then(mekan => {
            if (this.pic1) {
                mekan.pic1 = this.pic1;
                req.session.Mekan.pic1 = this.pic1;
            }
            if (this.pic2) {
                mekan.pic2 = this.pic2;
                req.session.Mekan.pic2 = this.pic2;
            }
            if (this.pic3) {
                mekan.pic3 = this.pic3;
                req.session.Mekan.pic3 = this.pic3;
            }
            mekan.save((error) => {
                if (!error) {
                    console.log("kaydedildi");
                    res.render('isletmeSahibi', { mekan: req.session.Mekan, msg: undefined });
                }
                else {
                    console.log("hatali" + error);
                }
            })
        })
    }
    puanGuncelle(req, res) {
        //mekanprofil sayfasında çağrılcaktır.
        console.log(req.session.User.kod);
        Db.findOneAndUpdate().where('mekanKodu').equals(req.session.User.kod).then(mekan => {
            var mekanPuani = mekan.puan;
            var puanVerenS = mekan.puanVerenSayisi;
            var toplamP = (mekanPuani * puanVerenS);
            puanVerenS = puanVerenS + 1;
            toplamP = toplamP + Number(req.body.puan);
            mekan.puan = toplamP / puanVerenS;
            mekan.puan = mekan.puan.toFixed(2);
            mekan.puanVerenSayisi = puanVerenS;
            mekan.save((error) => {
                if (!error) {
                    console.log("kaydedildi");
                    console.log(mekan.puan);
                }
                else {
                    console.log("hatali" + error);
                }
            });
        })
    }
    kullaniciPuanDusur(req, res) {
        console.log("kurdu");
        kullanici.findOneAndUpdate().where('email').equals(req.body.kullaniciEmail).then(user => {
            if (user.puan < Number(req.body.kullanilacakPuan)) {
                var mesaj = "yeteri kadar puan yok:" + user.puan;
                res.render('isletmeSahibi', { mekan: req.session.Mekan, msg: mesaj });
            }
            else if (user.puan >= Number(req.body.kullanilacakPuan)) {
                var kalanpuan = user.puan - Number(req.body.kullanilacakPuan)
                var mesaj1 = "Puan Kullanildi, kalan puan:" + kalanpuan;
                res.render('isletmeSahibi', { mekan: req.session.Mekan, msg: mesaj1 });
                user.puan = user.puan - Number(req.body.kullanilacakPuan);
                user.save((error) => {
                    if (!error) {
                        console.log("kaydedildi");
                        console.log(user.puan);
                    }
                    else {
                        console.log("hatali" + error);
                    }
                })
            }
        })
    }
}
module.exports = musteriDataBase;