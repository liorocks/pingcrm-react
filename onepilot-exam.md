I - NPM / COMPOSER PACKAGES

GSAP[https://www.npmjs.com/package/gsap] / rivejs[https://www.npmjs.com/package/rive-js]
Purely for an aestethic purpose, those two packages offers a lot of possibilities for creating advanced animation as to create an original design for the website

Typescript[https://create-react-app.dev/docs/adding-typescript/]
See section : CODE IMPROVEMENT - Typescript

Craco[https://www.npmjs.com/package/@craco/craco]
It is implemented as an easy way to override create-react-app configuration, the goal behind to be able to use Tailwind and Typescript in React without modifying Webpack.config.js or eject from CRA configuration

Capchta[https://github.com/mewebstudio/captcha]
The implementation of Capchta (e.g: During a user creation) can prevent the creation of fake users by bots


II CODE IMPROVEMENT

Password reset token[https://laravel.com/docs/8.x/passwords]
It would be safer and more user-friendly to allow them to reset their password by email, Laravel allow us to do that via the 'Password' facade and the sendResetLink method, which check if the user email is existing in the database and create the reset link if so

Typescript[https://www.carlrippon.com/why-typescript-with-react/]
Typescript can be usefull in large apps especially when different developers works on the same project.
It has a lot of advantages for developers like making the code more easely readeable for a new comer on a project or during refactoring, and catching potential bugs while we type the code avoiding even further the refactoring time

Miscealleaneous - Crowdsec[https://crowdsec.net/]
To install on the production server, it is a community-based solution to secure your server.
Allowing you to create an intrusion detection system which apply behavior scenarios to identify threats or reconise blacklisted IPs, and reply with the setup 'bouncers' for the correct trigger (e.g: capthta, ban, etc.)


III FEATURE IMPROVEMENT

Better dasboard
The actual dashboard doesn't serve any purpose for users, some components should be implemented like displayings the most recents reports/organisations for example or even display information for the current user

Adding contact / support
Every plateform should display some contact information or some form of support on the platform to help solve any problems that may arise


Multilanguage
Adding a multilanguage and localization would allow to more users to the plateform by removing the language barrier for them

