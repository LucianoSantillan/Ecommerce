import { rest } from 'msw'

export const handlers = [
    rest.get('http://localhost:4000/api/products?category=t-shirt&page=1', (req, res, ctx) => {
        return res(ctx.json({
            "products": [
                { "id": 1, "name": "remera negra", "for_who": "man", "description": "descripcion 1", "category": "t-shirt", "price": 150, "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUtM3J8eVKEh9MBlZfhX1rKegTKmAjBu7IzBWIzuRHTUW_O7cgopqflc2g-Wm_rVGNNlE&usqp=CAU" },
                { "id": 2, "name": "remera rosa", "for_who": "woman", "description": "descripcion 2", "category": "t-shirt", "price": 110, "imgUrl": "https://www.estarguapas.com/pics/2021/04/20/killer-whale-camiseta-mujer-manga-corta-algodon-basica-rosa-s-47369.jpg" }
            ],
            "currentPage": "1",
            "pages": 2,
            "total": 4
        }))
    })
]