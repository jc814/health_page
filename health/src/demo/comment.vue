<template>
  <div>
    <el-row>
      <el-col :span="10">
        <el-form label-width="100px">
          <el-form-item label="服务评分：">
            <el-col :span="8">
              <el-rate
                v-model="serviceScore"
                :colors="['#99A9BF', '#F7BA2A', '#00BF00']"
                :texts="['极差', '失望', '一般', '满意', '惊喜']"
                show-text>
              </el-rate>
            </el-col>
          </el-form-item>
          <el-form-item label="效果评分：">
            <el-col :span="8">
              <el-rate
                v-model="resultScore"
                :colors="['#99A9BF', '#F7BA2A', '#00BF00']"
                :texts="['极差', '失望', '一般', '满意', '惊喜']"
                show-text>
              </el-rate>
            </el-col>
          </el-form-item>
          <el-form-item label="费用评分：">
            <el-col :span="8">
              <el-rate
                v-model=" expenseScore"
                :colors="['#99A9BF', '#F7BA2A', '#00BF00']"
                :texts="['极差', '失望', '一般', '满意', '惊喜']"
                show-text>
              </el-rate>
            </el-col>
          </el-form-item>
          <el-form-item label="评论：">
            <textarea name="content" id="editor">
              <p>Here goes the initial content of the editor.</p>
            </textarea>
          </el-form-item>
          <el-form-item label="匿名发布：">
            <el-col :span="4">
              <el-switch
                v-model="hideName"
                active-color="#00BF00"
                inactive-color="#99A9BF">
              </el-switch>
            </el-col>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
//  import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials'
//  import AutoformatPlugin from '@ckeditor/ckeditor5-autoformat/src/autoformat'
//  import BoldPlugin from '@ckeditor/ckeditor5-basic-styles/src/bold'
//  import ItalicPlugin from '@ckeditor/ckeditor5-basic-styles/src/italic'
//  import BlockquotePlugin from '@ckeditor/ckeditor5-block-quote/src/blockquote'
//  import HeadingPlugin from '@ckeditor/ckeditor5-heading/src/heading'
//  import ImagePlugin from '@ckeditor/ckeditor5-image/src/image'
//  import ImagecaptionPlugin from '@ckeditor/ckeditor5-image/src/imagecaption'
//  import ImagestylePlugin from '@ckeditor/ckeditor5-image/src/imagestyle'
//  import ImagetoolbarPlugin from '@ckeditor/ckeditor5-image/src/imagetoolbar'
//  import LinkPlugin from '@ckeditor/ckeditor5-link/src/link'
//  import ListPlugin from '@ckeditor/ckeditor5-list/src/list'
//  import ParagraphPlugin from '@ckeditor/ckeditor5-paragraph/src/paragraph'
  export default {
    data () {
      return {
        serviceScore: null,
        resultScore: null,
        hideName: null,
        expenseScore: null
      }
    },
    mounted () {
      ClassicEditor.create(document.querySelector('#editor'), {
        toolbar: [
          'headings',
          'bold',
          'italic',
          'link',
          'bulletedList',
          'numberedList',
          'blockQuote',
          'undo',
          'redo'
        ],
        image: {
          toolbar: [
            'imageStyleFull',
            'imageStyleSide',
            '|',
            'imageTextAlternative'
          ]
        }
      })
        .then(editor => {
          window.editor = editor
        })
        .catch(err => {
          console.error(err.stack)
        })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
