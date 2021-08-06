const admin = require('firebase-admin')
const path = require('path')

//var serviceAccount = require(process.env.GOOGLE_APPLICATIONS_CREDENTIALS);
//var serviceAccount =  require("C:/Users/DemonDriver/Documents/PROYECTO PROGRAMACION/practica 6 - segundo intento/practica6-f0654-firebase-adminsdk-3byy2-83bd349fee.json");
//var serviceAccount =  require(path.resolve('./')+"/practica6-f0654-firebase-adminsdk-3byy2-83bd349fee.json");
/*admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://practica6-f0654-default-rtdb.firebaseio.com"
});*/
admin.initializeApp({
  credential: admin.credential.cert({
    "project_id": "practica6-f0654",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCdbkcpv+fZX2oa\nBs7vv9vmuwL2vFJ3bqUGL/VszotejgoGXXk0kSbrzk2uYvXgs6SLeHAzUAgEhDjG\nt7m2wZaoH9YIgImmFy6xYXdi0+GOl6oXryAjxqC+UfgsbitYb/iKBEbfMgXOtr0b\nGCyVcIoE65MRrESSiC3tltenXyA98GJGrSANr5VV87qDdcTWbxDBb6XApGHZZgdW\nSSBIkLs57A9Y7Ml7ituMJ96JMHb8a9v8wHpDteso/wXkwU0Nt260MJvrhOPu5EPF\nQZHMWc4oNPYCPRqmkDlt6PM/jKXoHjIDxyb1NQcpcoaRXmLoMQe5QZtR9EzyPB+p\n7h19WDfDAgMBAAECggEAAhjJedv9X+J5Afif6PiuGnSfpXtua/qWLW7rbQXMIBSA\nra3p7ZXBV9gF0Nk9BgZ683XwFttRI5OYJuLA5nqxKMiK4UBVBsovXenlh9fjgE8k\n0wvuhv08f743v/wwjPCNS1eGy+eSNuW7vxCjXLahPGv8J7OpBF/zEfxgWEbKTHqn\nI/nvzXtSrvNz9q0bIynptXY1X+cFqG8fEIpxqsVihxvgZ8Mg/BDa78MnU2KUbFkD\n+n52lOcP/j3C4/XLfczp8rG0BabiCW0khaS698NFAPu1bkDhzGJQSblmIP7x98at\nC5wme+kCuDgxQaE543f3exrgzXYBePmT7Y6fNhhXgQKBgQDULtzZOBZjyLX6LPEF\nwSYpiFAzb6xRj1XmWSk1lf41ZYUs6A2rmmIDGnYRho1U+mXAyVuKoSd1Iu7EktaQ\nU2E2Bc1oEFTxALVGcxAyMxEJdl/hqQTitQfjCkSbasMHYhd085vAAkJtDpy6nEMD\n+GGUNlIkYGukUuELUKoUmfLijQKBgQC98OpHyXjRu2ixYBx1fR+Wl4SLotcmWNMD\nXnEgb1S/sF93iFcTsCGT9io/XInm4nL642178XSFJwxGB2sopJSZxhUcUoO490mp\nFRWPjUm3dJ8PV15DscKqc5IjQETW8ovXgThYEmEEG0jZwtjnuhXBVvf22BMjcmd1\nUb1sIdUXjwKBgFvA+BemvWfg/3BzxrYqVApZu/TCMc4DIa4+mCdn+Um14OUOY/r1\nA7U72Bq0CKHate2sJT3JenqY5I90v/whUkQ+NhjuFw0wtTMFxtcuZguleMjogghX\nKFXxtsFOZY/nxyT3wz5Au+DVFMlNkV1CJ1AkPVklqOaiQFbYRvQprnJxAoGAFd65\new6NpMiJY3MHk9eWXYaQsmtLjpTHpymmqO9ouLGcLG08aX3sP9cmQilrj3QffRfW\nsWC54+L9HMsZ4ZIhshsGrz4pAJEooBlXZDIGfOMmtWN/7Rd4rJumBf0OcBl5VJUC\nYdGr7gceOkSfKP9aJerXnkp+2aQAmZeR0fOLT60CgYAEwEj7kjeB5/rSkZtvkEQ9\nTGZck1F/pIBIjKDyOuK4LL45urgRTMa5HaWHNbaK7n461cjSdRgnPVYH468rRzFW\nB+U4UXM7IGHTfWS2eCSShgkL1Ki9aRa6vx9PfdJIx+WnyLrirnfYKerGT6+wf7hk\nXfaQW/+c8PltNXkM+Uddkw==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-3byy2@practica6-f0654.iam.gserviceaccount.com",
  }),
  databaseURL: "https://practica6-f0654-default-rtdb.firebaseio.com"
});
const db = admin.database();

const { Router}= require('express');
const router = Router();

router.get('/', (req, res) => {
    db.ref('contacts').once('value', (snapshot) => {
       data = snapshot.val();
       res.render('index', {contacts: data})
    });
})

router.post('/new-contact', (req, res) => {
    const newContact = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone
    }
    db.ref('contacts').push(newContact);
    res.redirect('/');
});

router.get('/delete-contact/:id', (req, res) => {
    db.ref('contacts/' + req.params.id).remove();
    res.redirect('/');
});

module.exports = router;