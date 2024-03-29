<template>
  <div class="wrap-cart">
    <!-- 表格 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      border
      @selection-change="handleSelectionChange"
      @row-click="handleRowClick"
    >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="items"
        label="ITEMS"
        width="120">
        <template slot-scope="scope">
          <img :src="require(`~/images/${scope.row.productImage}`)"/>
          {{ scope.row.productName }}
        </template>
      </el-table-column>
      <el-table-column
        prop="salePrice"
        label="PRICE"
        width="120">
      </el-table-column>
      <el-table-column
        prop="productNum"
        label="QUANTITY"
        >
      </el-table-column>
      <el-table-column
        prop="subtotal"
        label="SUBTOTAL"
        width="120">
      </el-table-column>
      <el-table-column
        prop="edit"
        label="EDIT"
        width="120">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 页码 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNum">
    </el-pagination>
    <!-- 总计 -->
    <div class="footer">
      <div class="price">
        totalPrice: {{ totalPrice }}
      </div>
      <div class="btn-checkout" @click="handleCheckoutClick">
        CHECKOUT
      </div>
    </div>
  </div>
</template>

<script>
import Api from '~/api/index.api'
import BigNumber from 'bignumber.js'
export default {
  name: 'Cart',
  layout: 'lawl1et',
  data () {
    return {
      user: '',
      tableData: [],
      multipleSelection: [], // 多选框选项

      // 分页
      currentPage: 1, // 当前页
      pageSize: 5, // 默认显示[每页显示多少条]
      pageSizes: [2, 3, 4, 5], // 每页显示多少条选项
      totalNum: 0 // 共多少条
    }
  }, 
  computed: {
    // 组合查询属性
    cartQueryParam () {
      return {
        page: this.currentPage,
        pageSize: this.pageSize,
        userid: this.user ? this.user.userId : ''
      }
    },
    // 计算总价
    totalPrice () {
      let sum = new BigNumber(0)
      if (Array.isArray(this.multipleSelection) && this.multipleSelection.length > 0) {
        this.multipleSelection.forEach(item => {
          sum = sum.plus(item.subtotal)
        })
        return sum
      }
      return 0
    }
  },
  watch: {
    cartQueryParam: {
      handler (n) {
        if (n) {
          this.fetchCartList(n)
        }
      },
      deep: true
    }
  },
  methods: {
    // 多选框
    handleSelectionChange (val) {
      console.log('handleSelectionChange val', val)
      this.multipleSelection = val
    },
    // 点击行
    handleRowClick (row) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    // 删除
    handleDelete (index, row) {
      console.log(`index:${index};`)
      console.log('row', row)
      let reqParam = {
        productId: row.productId,
        userId: this.user.userId
      }
      Api.delCart(reqParam)
        .then(res => {
          let { response } = res
          if (!response.error_code) {
            this.fetchCartList(this.cartQueryParam)
            this.$message({
              message: '删除成功',
              center: true,
              duration: 1 * 1000
            })
          }
        })
        .catch(err => {
          console.log('handleDelete err', err)
        })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
    },
    fetchCartList (queryParam) {
      Api.getCartList(queryParam)
        .then(res => {
          let { info, response } = res
          if (!response.error_code) {
            this.handleCartList(info)
          }
        })
        .catch(err => {
          console.log('fetchCartList err', err)
        })
    },
    handleCartList (info) {
      let { data, totalNum } = info
      this.totalNum = totalNum
      this.tableData = data
      this.tableData.forEach(item => {
        item.subtotal = item.productNum * item.salePrice
      })
    },
    handleCheckoutClick () {
      if (this.multipleSelection.length <= 0) {
        this.$message({
          message: '请选择',
          center: true,
          duration: 1 * 1000
        })
        return false
      }

      let productIds = []

      this.multipleSelection.forEach(item => {
        productIds.push(item.productId)
      })

      Api.cartConfirm({productIds})
        .then(res => {
          let { response } = res
          if (!response.error_code) {
            this.$router.push({ path: '/OrderConfirm/address' })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.user = this.$cookie.get('user') ? this.$cookie.get('user') : ''
    if (!this.user) {
      this.$router.push({ path: '/login' })
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap-cart{
  .footer{
    display: flex;
    align-items: center;
    margin-top: 20px;
    padding: 16px;
  }
  .btn-checkout{
    padding: 10px;
    margin-left: 10px;
    border: 1px solid #ccc;
    cursor: pointer;
  }
}
</style>
