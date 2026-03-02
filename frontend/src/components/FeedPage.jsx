import React from 'react'
import './FeedPage.css'

const feedItems = [
  {
    id: 1,
    title: '2 xonali kvartira markazda',
    type: 'kvartira',
    price: "4 500 000 so'm / oyiga",
    image: 'https://images.pexels.com/photos/3637729/pexels-photo-3637729.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 2,
    title: 'Kunduzi ofis, kechasi co-working',
    type: 'ofis',
    price: "250 000 so'm / kunga",
    image: 'https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 3,
    title: 'Sedan avtomobil ijaraga',
    type: 'avto',
    price: "350 000 so'm / kunga",
    image: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 4,
    title: 'Yangi studiya, city view',
    type: 'kvartira',
    price: "5 200 000 so'm / oyiga",
    image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
]

function FeedPage({ onClose }) {
  return (
    <div className="feed-overlay">
      <div className="feed-shell">
        <header className="feed-header">
          <h2>Lenta</h2>
          <button className="feed-close" onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </header>

        <div className="feed-content">
          {feedItems.map(item => (
            <article key={item.id} className="feed-card">
              <div className="feed-image-wrapper">
                <img src={item.image} alt={item.title} className="feed-image" />
              </div>
              <div className="feed-card-body">
                <div className="feed-badge">{item.type}</div>
                <h3>{item.title}</h3>
                <p className="feed-price">{item.price}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FeedPage


