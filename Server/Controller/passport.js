const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;

const passport = require("passport");

const GOOGLE_CLIENT_ID = "766707896907-qte054tplfqu6q66r6ds3qi496fn2bu5.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

GITHUB_CLIENT_ID = "8fd7e227b064efbf5369";
GITHUB_CLIENT_SECRET = "0afdcc334bda8189901ff294d8ec6562d19240c6";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});