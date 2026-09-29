import { Hero, About, Skills, Experience, Projects, Certifications, Blog, Contact } from "../../sections";

const Homepage = () => {
    return (
        <main className="w-full">
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Certifications />
            <Blog />
            <Contact />
        </main>
    );
};

export default Homepage;


