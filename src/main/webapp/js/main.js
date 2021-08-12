var firebaseConfig = {
    apiKey: "AIzaSyAn_PoyXM78bl6g_tuEkfuVhEKGAmkR_CM",
    authDomain: "myflix-87022.firebaseapp.com",
    projectId: "myflix-87022",
    storageBucket: "myflix-87022.appspot.com",
    messagingSenderId: "179191776218",
    appId: "1:179191776218:web:ec47f810dd715ede5f76e3",
    measurementId: "G-P59DRHCKD7"
};

var uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
    ],
    callbacks: {
        signInSuccessWithAuthResult: function (authResult) {
            if (authResult.user) {
                handleSignedInUser(authResult.user);
            }
            return false;
        },
        signInFailure: function (error) {

        }
    },

    autoUpgradeAnonymousUsers: true
};
var ui
$(function () {
    firebase.initializeApp(firebaseConfig);
    ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', uiConfig);
    firebase.auth().onAuthStateChanged(function (user) {
        user ? handleSignedInUser(user) : handleSignedOutUser();
        $("#login-spinner").addClass("d-none")
    });
});

function handleSignedInUser(user) {
    $(".user").removeClass("d-none")
    $(".guest").addClass("d-none")

    $("#name").text(user.displayName);
    $("#email").text(user.email);
    $("#phone").text(user.phoneNumber);
    if (user.photoURL) {
        $(".avatar").attr("src",user.photoURL);
    } else {
        $(".avatar").attr("src","/images/user.svg");
    }
    $('#modal-login').modal('hide');
}
function handleSignedOutUser() {
    ui.start("#firebaseui-auth-container", uiConfig);
    $(".user").addClass("d-none")
    $(".guest").removeClass("d-none")
}