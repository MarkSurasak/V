import { Group, ArrowHelper } from 'three'
import { gennerateDataChunk, asVector3 } from '../math/Utils'

class ArrowField extends Group {

  Constitutor(minPoint, maxPoint, density, vectorField) {
    const chunk = gennerateDataChunk (minPoint, maxPoint, density)
    
    const direction_vectors = asVector3(vectorField.getVector(chunk))
    const position_vectors = asVector3(chunk)

    position_vectors.forEach((position, index) => {
      this.add(new ArrowHelper (direction_vectors[index], position, 1))
    })
  }
  
  update() {
    const direction_vectors = asVector3(this.vectorField.getVector(this.chunk))

    this.childen.forEach((child, index) => {
      child[index].setDirection(direction_vectors[index])
    })
  }
}

export { ArrowField }
