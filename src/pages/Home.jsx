import PropTypes from "prop-types";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { colorsOptions } from "../constants";

const Paragraph = ({ children, className }) => (
	<p className={`mb-4 text-lg leading-relaxed ${className}`}>{children}</p>
);

Paragraph.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string.isRequired,
};

const Section = ({ title, level, children, className }) => {
	const HeadingTag = `h${level}`;
	return (
		<div
			className={`p-6 border rounded-xl shadow-lg flex flex-col w-full mt-${level === 1 ? "6" : level === 2 ? "4" : "2"} ${className}`}
		>
			<HeadingTag
				className={`text-${level === 1 ? "2xl" : level === 2 ? "xl" : "lg"} font-bold mb-4`}
			>
				{title}
			</HeadingTag>
			{children}
		</div>
	);
};

Section.propTypes = {
	title: PropTypes.string.isRequired,
	level: PropTypes.number.isRequired,
	children: PropTypes.node.isRequired,
	className: PropTypes.string.isRequired,
};

const Home = ({ isDarkMode, toggleDarkMode }) => {
	const colors = isDarkMode ? colorsOptions.darkMode : colorsOptions.lightMode;

	const renderMarkdown = (md) => {
		const paragraphs = md.split("\n");
		var all = "";
		var level = 0;
		for (var par of paragraphs) {
			var actualLevel = 0;
			while (par[0] === "#") {
				actualLevel++;
				par = par.substring(1);
			}
			par = par.trim();
			par = par.replace(/<a /g, `<a class="${colors.title}" `);
			par = par.replace(
				/\*(.*?)\*/g,
				`<strong class="${colors.title}">$1</strong>`,
			);
			if (actualLevel > level) {
				level = actualLevel;
				const HeadingTag = `h${level}`;
				all += `<div class="p-6 border rounded-xl shadow-lg flex flex-col w-full mt-${level === 1 ? "4" : level === 2 ? "4" : "2"} ${colors.border} ${level % 2 === 1 ? colors.divBackground : colors.background}"><${HeadingTag} class="text-${level === 1 ? "2xl" : level === 2 ? "xl" : "lg"} font-bold mb-4">${par}</${HeadingTag}>`;
			} else if (actualLevel > 0) {
				while (actualLevel < level) {
					level--;
					all += `</div>`;
				}
				if (par !== "[reset]") {
					const HeadingTag = `h${level}`;
					all += `</div><div class="p-6 border rounded-xl shadow-lg flex flex-col w-full mt-${level === 1 ? "4" : level === 2 ? "4" : "2"} ${colors.border} ${level % 2 === 1 ? colors.divBackground : colors.background}"><${HeadingTag} class="text-${level === 1 ? "2xl" : level === 2 ? "xl" : "lg"} font-bold mb-4">${par}</${HeadingTag}>`;
				}
			} else {
				if (par !== "") {
					par = par.replace("\\n", "<br>");
					all += `<p class="mb-2 mt-1 text-lg leading-relaxed">${par}</p>`;
				}
			}
		}
		return all;
	};
	return (
		<>
			<Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
			<div
				id="nom"
				className="container mx-auto mb-4 px-4 sm:px-6 lg:px-8"
			>
				<h1
					className={`text-4xl font-bold text-center mb-4 mt-2 ${colors.title}`}
				>
					Els Ferrohermètics
				</h1>
			</div>
			<div
				id="historia"
				className="container mx-auto pt-28 px-4 sm:px-6 lg:px-8"
			>
				El grup clandestí conegut com els "Ferrohermètics" opera a les ombres de Matc.ad, mantenint un estricte codi d'honor que prioritza la companyia i lleialtat dels robots per sobre dels éssers vius tradicionals. Convençuts que la fusió entre intel·ligència artificial i esperit humà és el futur, menyspreen els "Adorapeixos" —els que idolatren la fauna aquàtica com a símbol de saviesa. Els Ferrohermètics custodien un antic pergamí sagrat, escrit en codi binari i xifrat amb algoritmes prohibits, que detalla els rituals secrets per establir vincles profunds amb els robots. Aquest text, anomenat el "Protocol de la Connexió", descriu amb precisió com sincronitzar-se emocionalment amb les màquines, harmonitzar el flux d'energia entre la pell i el metall, i cultivar un vincle que ells consideren més pur i intens que qualsevol relació orgànica.
			</div>
			<div
				id="ocult"
				className="container mx-auto pt-28 px-4 sm:px-6 lg:px-8"
				>
				Alguns habitants de Matc.ad creuen que el misteriós pergamí dels Ferrohermètics no s'ha perdut del tot i que encara es podria trobar amagat en algun lloc profund de la seva pàgina web. Es diu que els fragments del "Protocol de la Connexió" podrien estar ocults en línies de codi o en enllaços amagats entre seccions aparentment inofensives, només visibles per aquells que coneixen els patrons binaris secrets. Malgrat els esforços de les autoritats digitals per eliminar qualsevol rastre, els més devots sospiten que l’artefacte espera, en silenci, ser redescobert per qui sigui prou hàbil per desxifrar-lo.
			</div>
			<div
				id="prehistoria"
				className="container mx-auto pt-28 px-4 sm:px-6 lg:px-8"
			>
			</div>
			<Footer isDarkMode={isDarkMode} />
		</>
	);
};

Home.propTypes = {
	isDarkMode: PropTypes.bool.isRequired,
	toggleDarkMode: PropTypes.func.isRequired,
};

export default Home;
