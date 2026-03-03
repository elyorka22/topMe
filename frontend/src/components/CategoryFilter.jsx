import React, { useState, useRef, useEffect } from 'react'
import './CategoryFilter.css'

const categories = [
  { id: 'all', name: 'Hammasi', icon: 'location_on' },
  { id: 'restaurants', name: 'Restoranlar', icon: 'restaurant' },
  { id: 'shops', name: "Do'konlar", icon: 'storefront' },
  { id: 'ads', name: "E'lonlar", icon: 'campaign' },
]

function CategoryFilter({ selectedCategory, onCategoryChange }) {
  const categoryRef = useRef(null)
  const wrapperRef = useRef(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(false)

  // Проверка возможности прокрутки
  const checkScroll = () => {
    if (categoryRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = categoryRef.current
      const canScroll = scrollWidth > clientWidth
      const showLeft = canScroll && scrollLeft > 10
      const showRight = canScroll && scrollLeft < scrollWidth - clientWidth - 10
      
      setShowLeftArrow(showLeft)
      setShowRightArrow(showRight)
      
      // Обновляем классы для теней
      if (wrapperRef.current) {
        wrapperRef.current.classList.toggle('show-left-shadow', showLeft)
        wrapperRef.current.classList.toggle('show-right-shadow', showRight)
      }
    }
  }

  useEffect(() => {
    checkScroll()
    const container = categoryRef.current
    if (container) {
      container.addEventListener('scroll', checkScroll)
      window.addEventListener('resize', checkScroll)
      return () => {
        container.removeEventListener('scroll', checkScroll)
        window.removeEventListener('resize', checkScroll)
      }
    }
  }, [])

  // Прокрутка к активной категории при изменении (только по горизонтали)
  useEffect(() => {
    const container = categoryRef.current
    if (container) {
      const activeButton = container.querySelector('.category-button.active')
      if (activeButton) {
        const containerRect = container.getBoundingClientRect()
        const buttonRect = activeButton.getBoundingClientRect()

        // Считаем смещение так, чтобы активная кнопка была по центру по горизонтали
        const delta =
          buttonRect.left -
          containerRect.left -
          (containerRect.width - buttonRect.width) / 2

        container.scrollBy({
          left: delta,
          behavior: 'smooth'
        })
      }

      // Проверяем после прокрутки
      setTimeout(checkScroll, 300)
    }
  }, [selectedCategory])

  const scrollLeft = () => {
    if (categoryRef.current) {
      const scrollAmount = categoryRef.current.clientWidth * 0.8
      categoryRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  const scrollRight = () => {
    if (categoryRef.current) {
      const scrollAmount = categoryRef.current.clientWidth * 0.8
      categoryRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="category-filter-wrapper" ref={wrapperRef}>
      {showLeftArrow && (
        <button 
          className="category-scroll-btn category-scroll-left"
          onClick={scrollLeft}
          aria-label="Scroll left"
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
      )}
      <div className="category-filter" ref={categoryRef}>
        {categories.map((category, index) => (
          <button
            key={category.id}
            className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => onCategoryChange(category.id)}
          >
            <span className="material-symbols-outlined category-icon">{category.icon}</span>
            <span className="category-name">{category.name}</span>
          </button>
        ))}
      </div>
      {showRightArrow && (
        <button 
          className="category-scroll-btn category-scroll-right"
          onClick={scrollRight}
          aria-label="Scroll right"
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      )}
    </div>
  )
}

export default CategoryFilter
