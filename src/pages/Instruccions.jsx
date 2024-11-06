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

const Instructions = ({ isDarkMode, toggleDarkMode }) => {
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
			Cumming soon...
			</div>
			<Footer isDarkMode={isDarkMode} />
		</>
	);
};

Instructions.propTypes = {
	isDarkMode: PropTypes.bool.isRequired,
	toggleDarkMode: PropTypes.func.isRequired,
};

export default Instructions;
