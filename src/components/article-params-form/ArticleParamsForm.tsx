import { useState, FormEvent, useRef, useEffect } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import {
	defaultArticleState,
	ArticleStateType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsFormProps {
	onApply: (state: ArticleStateType) => void;
	onReset: () => void;
}

export const ArticleParamsForm = ({
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	const asideRef = useRef<HTMLDivElement>(null);

	const toggleOpen = () => setIsOpen((prev) => !prev);

	const handleClickOutside = (e: MouseEvent) => {
		if (asideRef.current && !asideRef.current.contains(e.target as Node)) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		if (!isOpen) return;
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isOpen]);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onApply(formState);
		setIsOpen(false);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onReset();
	};

	const handleFontFamilyChange = (
		selected: (typeof fontFamilyOptions)[number]
	) => {
		setFormState((prev) => ({ ...prev, fontFamilyOption: selected }));
	};

	const handleFontSizeChange = (selected: (typeof fontSizeOptions)[number]) => {
		setFormState((prev) => ({ ...prev, fontSizeOption: selected }));
	};

	const handleFontColorChange = (selected: (typeof fontColors)[number]) => {
		setFormState((prev) => ({ ...prev, fontColor: selected }));
	};

	const handleBackgroundColorChange = (
		selected: (typeof backgroundColors)[number]
	) => {
		setFormState((prev) => ({ ...prev, backgroundColor: selected }));
	};

	const handleContentWidthChange = (
		selected: (typeof contentWidthArr)[number]
	) => {
		setFormState((prev) => ({ ...prev, contentWidth: selected }));
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleOpen} />

			<aside
				ref={asideRef}
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h2' size={31} weight={800} uppercase align='left'>
						Задайте параметры
					</Text>

					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleFontFamilyChange}
						title='Шрифт'
					/>

					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={handleFontSizeChange}
						title='Размер шрифта'
					/>

					<Select
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleFontColorChange}
						title='Цвет шрифта'
					/>

					<Separator />

					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleBackgroundColorChange}
						title='Цвет фона'
					/>

					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleContentWidthChange}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='clear' onClick={handleReset} />
						<Button title='Применить' type='apply' htmlType='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
