const bcrypt = require('bcryptjs');

const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (err, salt) => {
            if (err) {
               return reject(err);
            }

            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    return reject(err);
                }
                 resolve(hash);
            })
        })
    })
}

module.exports = hashPassword;


// const bcrypt = require('bcryptjs');

// const hashPassword = (password) => {
//     return new Promise((resolve, reject) => {
//         bcrypt.genSalt(12, (err, salt) => {
//             if (err) {
//                 reject(err); // Reject with error if salt generation fails
//             } else {
//                 bcrypt.hash(password, salt, (err, hash) => {
//                     if (err) {
//                         reject(err); // Reject with error if hashing fails
//                     } else {
//                         resolve(hash); // Resolve with hash if successful
//                     }
//                 });
//             }
//         });
//     });
// }

// module.exports = hashPassword;
