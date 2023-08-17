import { describe, expect, it } from 'vitest'
import { player as reducer, play, next, PlayerState } from './player'

const exampleState: PlayerState = {
  course: {
    id: 1,
    modules: [
      {
        id: 1,
        title: 'Flexbox basics',
        lessons: [
          { id: 'hwbqquXww-U', title: 'Flexbox containers', duration: '17:30' },
          {
            id: '4Oi5xpjoCRk',
            title: 'Flexbox Items',
            duration: '1:39',
          },
        ],
      },
      {
        id: 2,
        title: '100 Seconds of Code',
        lessons: [
          {
            id: 'DC471a9qrU4',
            title: 'Array Map',
            duration: '1:40',
          },
          {
            id: 'g2o22C3CRfU',
            title: 'Big-O Notation',
            duration: '1:39',
          },
        ],
      },
    ],
  },
  isLoading: false,
  currentModuleIndex: 0,
  currentLessonIndex: 0,
}

describe('player slice', () => {
  it('should be able to play', () => {
    const state = reducer(exampleState, play([1, 2]))

    expect(state.currentModuleIndex).toEqual(1)
    expect(state.currentLessonIndex).toEqual(2)
  })

  it('should be able to play next video automatically', () => {
    const state = reducer(exampleState, next())

    expect(state.currentModuleIndex).toEqual(0)
    expect(state.currentLessonIndex).toEqual(1)
  })

  it('should be able to jump to the next module automatically', () => {
    const state = reducer(
      {
        ...exampleState,
        currentLessonIndex: 1,
      },
      next(),
    )

    expect(state.currentModuleIndex).toEqual(1)
    expect(state.currentLessonIndex).toEqual(0)
  })

  it('should not update the current module and lesson index if there is not next lesson available', () => {
    const state = reducer(
      {
        ...exampleState,
        currentModuleIndex: 1,
        currentLessonIndex: 1,
      },
      next(),
    )

    expect(state.currentModuleIndex).toEqual(1)
    expect(state.currentLessonIndex).toEqual(1)
  })
})
