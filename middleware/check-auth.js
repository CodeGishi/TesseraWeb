export default function ({ store, route, redirect, req }) {
  if (!store.getters['auth/username'] && route.name === 'storage') {
    redirect('/storage/login')
  }
}
