// Fallback данные для API запросов
// Используются когда API недоступен или возвращает ошибку

export const fallbackArchitecturePhotos = [
  {
    id: 'fallback-1',
    urls: {
      regular: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      small: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80',
      thumb: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200&q=80'
    },
    user: {
      name: 'Architecture Sample',
      links: {
        html: 'https://unsplash.com'
      }
    },
    description: 'Beautiful modern architecture sample'
  },
  {
    id: 'fallback-2',
    urls: {
      regular: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80',
      small: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400&q=80',
      thumb: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&q=80'
    },
    user: {
      name: 'Architecture Sample',
      links: {
        html: 'https://unsplash.com'
      }
    },
    description: 'Interior design sample'
  },
  {
    id: 'fallback-3',
    urls: {
      regular: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
      small: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80',
      thumb: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=200&q=80'
    },
    user: {
      name: 'Architecture Sample',
      links: {
        html: 'https://unsplash.com'
      }
    },
    description: 'Contemporary architecture sample'
  }
]

export const fallbackTeamMembers = [
  {
    id: 'fallback-1',
    name: 'Sarah Johnson',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+1 555-0101',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    imageMedium: 'https://randomuser.me/api/portraits/women/1.jpg',
    imageThumb: 'https://randomuser.me/api/portraits/women/1.jpg',
    city: 'New York',
    country: 'USA',
    position: 'Senior Partner',
    bio: 'Passionate about sustainable design and innovative architectural solutions.',
    socialLinks: [
      { network: 'linkedin', href: '#', label: 'LinkedIn' },
      { network: 'twitter', href: '#', label: 'Twitter' }
    ]
  },
  {
    id: 'fallback-2',
    name: 'Michael Chen',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.chen@example.com',
    phone: '+1 555-0102',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    imageMedium: 'https://randomuser.me/api/portraits/men/1.jpg',
    imageThumb: 'https://randomuser.me/api/portraits/men/1.jpg',
    city: 'Los Angeles',
    country: 'USA',
    position: 'Associate',
    bio: 'With over 15 years of experience in residential and commercial projects.',
    socialLinks: [
      { network: 'linkedin', href: '#', label: 'LinkedIn' },
      { network: 'twitter', href: '#', label: 'Twitter' }
    ]
  },
  {
    id: 'fallback-3',
    name: 'Emma Wilson',
    firstName: 'Emma',
    lastName: 'Wilson',
    email: 'emma.wilson@example.com',
    phone: '+1 555-0103',
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
    imageMedium: 'https://randomuser.me/api/portraits/women/2.jpg',
    imageThumb: 'https://randomuser.me/api/portraits/women/2.jpg',
    city: 'Chicago',
    country: 'USA',
    position: 'Senior Architect',
    bio: 'Specializes in modern minimalist architecture and interior design.',
    socialLinks: [
      { network: 'linkedin', href: '#', label: 'LinkedIn' },
      { network: 'twitter', href: '#', label: 'Twitter' }
    ]
  },
  {
    id: 'fallback-4',
    name: 'James Rodriguez',
    firstName: 'James',
    lastName: 'Rodriguez',
    email: 'james.rodriguez@example.com',
    phone: '+1 555-0104',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    imageMedium: 'https://randomuser.me/api/portraits/men/2.jpg',
    imageThumb: 'https://randomuser.me/api/portraits/men/2.jpg',
    city: 'Miami',
    country: 'USA',
    position: 'Design Director',
    bio: 'Award-winning architect with a focus on environmentally conscious design.',
    socialLinks: [
      { network: 'linkedin', href: '#', label: 'LinkedIn' },
      { network: 'twitter', href: '#', label: 'Twitter' }
    ]
  },
  {
    id: 'fallback-5',
    name: 'Olivia Martinez',
    firstName: 'Olivia',
    lastName: 'Martinez',
    email: 'olivia.martinez@example.com',
    phone: '+1 555-0105',
    image: 'https://randomuser.me/api/portraits/women/3.jpg',
    imageMedium: 'https://randomuser.me/api/portraits/women/3.jpg',
    imageThumb: 'https://randomuser.me/api/portraits/women/3.jpg',
    city: 'Seattle',
    country: 'USA',
    position: 'Interior Designer',
    bio: 'Expert in transforming spaces to meet unique client needs.',
    socialLinks: [
      { network: 'linkedin', href: '#', label: 'LinkedIn' },
      { network: 'twitter', href: '#', label: 'Twitter' }
    ]
  }
]
